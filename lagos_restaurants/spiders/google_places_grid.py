import scrapy
import json
import os
import time
import hashlib
import math
from collections import defaultdict

# Google Places API Grid Spider for Comprehensive Lagos Coverage
# Requires Google Places API key to be set as environment variable: GOOGLE_PLACES_API_KEY
# This spider uses a grid-based approach to ensure complete coverage of Lagos restaurants

class GooglePlacesGridSpider(scrapy.Spider):
    name = "google_places_grid"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.api_key = os.getenv('GOOGLE_PLACES_API_KEY')
        if not self.api_key:
            raise ValueError("Google Places API key is required. Set GOOGLE_PLACES_API_KEY environment variable.")
        
        # Performance optimization features
        self.place_details_cache = {}
        self.processed_place_ids = set()
        self.api_call_count = defaultdict(int)
        self.request_timestamps = []
        self.max_requests_per_second = 10
        
        # Grid tracking
        self.total_grids = 0
        self.completed_grids = 0
        self.grid_results = {}
    
    # Lagos bounding box coordinates (comprehensive coverage)
    LAGOS_BOUNDS = {
        'north': 6.7058,   # Northernmost point (Alaba area)
        'south': 6.3500,   # Southernmost point (Ikorodu area)  
        'east': 3.6500,    # Easternmost point (Ajah/Sangotedo area)
        'west': 3.1000     # Westernmost point (Agege area)
    }
    
    # Grid size in degrees (approximately 3km x 3km squares for optimal efficiency)
    # 0.027 degrees ≈ 3km at Lagos latitude
    GRID_SIZE = 0.027
    
    # Search radius for each grid cell (3km radius for thorough coverage)
    GRID_SEARCH_RADIUS = 3000  # 3km radius
    
    custom_settings = {
        'DOWNLOAD_DELAY': 0.15,  # Slightly longer delay for grid searches
        'CONCURRENT_REQUESTS': 3,  # Conservative concurrency for grid approach
        'CONCURRENT_REQUESTS_PER_DOMAIN': 3,
        'ROBOTSTXT_OBEY': False,
        'RETRY_TIMES': 3,
        'RETRY_HTTP_CODES': [500, 502, 503, 504, 408, 429],
        'AUTOTHROTTLE_ENABLED': True,
        'AUTOTHROTTLE_START_DELAY': 0.15,
        'AUTOTHROTTLE_MAX_DELAY': 3.0,
        'AUTOTHROTTLE_TARGET_CONCURRENCY': 3.0,
        'AUTOTHROTTLE_DEBUG': True,
        # Disable proxy middleware
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,
            'scrapy_user_agents.middlewares.RandomUserAgentMiddleware': 400,
            'rotating_proxies.middlewares.RotatingProxyMiddleware': None,
            'rotating_proxies.middlewares.BanDetectionMiddleware': None,
        }
    }
    
    def start_requests(self):
        """Generate grid points and create search requests for each"""
        grid_points = self.generate_grid_points()
        self.total_grids = len(grid_points)
        
        self.logger.info(f"Generated {self.total_grids} grid points for comprehensive Lagos coverage")
        self.logger.info(f"Grid size: {self.GRID_SIZE} degrees (~3km)")
        self.logger.info(f"Search radius per grid: {self.GRID_SEARCH_RADIUS}m")
        
        for i, (lat, lng) in enumerate(grid_points):
            # Apply rate limiting
            self.apply_rate_limiting()
            self.api_call_count['nearby_search'] += 1
            
            # Google Places Nearby Search API
            base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
            params = {
                'key': self.api_key,
                'location': f"{lat},{lng}",
                'radius': self.GRID_SEARCH_RADIUS,
                'type': 'restaurant',
                'keyword': 'restaurant'
            }
            
            url = f"{base_url}?" + "&".join([f"{k}={v}" for k, v in params.items()])
            
            yield scrapy.Request(
                url=url,
                callback=self.parse_grid_restaurants,
                meta={
                    'grid_id': f"grid_{i}",
                    'grid_center': (lat, lng),
                    'grid_index': i,
                    'page': 1
                },
                dont_filter=True
            )
    
    def generate_grid_points(self):
        """Generate grid points covering the entire Lagos area"""
        grid_points = []
        
        # Calculate number of steps in each direction
        lat_steps = math.ceil((self.LAGOS_BOUNDS['north'] - self.LAGOS_BOUNDS['south']) / self.GRID_SIZE)
        lng_steps = math.ceil((self.LAGOS_BOUNDS['east'] - self.LAGOS_BOUNDS['west']) / self.GRID_SIZE)
        
        self.logger.info(f"Grid dimensions: {lat_steps} x {lng_steps} = {lat_steps * lng_steps} total grids")
        
        # Generate grid center points
        for i in range(lat_steps):
            for j in range(lng_steps):
                lat = self.LAGOS_BOUNDS['south'] + (i + 0.5) * self.GRID_SIZE
                lng = self.LAGOS_BOUNDS['west'] + (j + 0.5) * self.GRID_SIZE
                
                # Ensure we don't go outside bounds
                if (lat <= self.LAGOS_BOUNDS['north'] and 
                    lng <= self.LAGOS_BOUNDS['east']):
                    grid_points.append((lat, lng))
        
        return grid_points
    
    def parse_grid_restaurants(self, response):
        """Parse restaurants from a grid search"""
        grid_id = response.meta['grid_id']
        grid_center = response.meta['grid_center']
        grid_index = response.meta['grid_index']
        page = response.meta.get('page', 1)
        
        try:
            data = json.loads(response.text)
        except json.JSONDecodeError:
            self.logger.error(f"Failed to parse JSON for {grid_id}: {response.text[:200]}")
            return
        
        status = data.get('status')
        if status != 'OK':
            if status == 'ZERO_RESULTS':
                self.logger.info(f"{grid_id} - No restaurants found")
            else:
                self.logger.error(f"{grid_id} - API Error: {status} - {data.get('error_message', 'Unknown error')}")
            
            # Mark grid as completed even with no results
            if page == 1:
                self.completed_grids += 1
                self.grid_results[grid_id] = 0
                self.log_progress()
            return
        
        results = data.get('results', [])
        restaurants_found = 0
        
        self.logger.info(f"{grid_id} (center: {grid_center[0]:.4f}, {grid_center[1]:.4f}) - Found {len(results)} restaurants on page {page}")
        
        for place in results:
            place_id = place.get('place_id')
            
            # Skip if already processed (deduplication across grids)
            if place_id in self.processed_place_ids:
                continue
            
            self.processed_place_ids.add(place_id)
            restaurants_found += 1
            
            # Extract basic information
            restaurant = {
                'name': place.get('name'),
                'place_id': place_id,
                'rating': place.get('rating'),
                'user_ratings_total': place.get('user_ratings_total'),
                'price_level': place.get('price_level'),
                'vicinity': place.get('vicinity'),
                'types': place.get('types', []),
                'business_status': place.get('business_status'),
                'source': 'google_places_grid',
                'grid_id': grid_id,
                'grid_center': grid_center,
                'grid_index': grid_index,
                'page': page
            }
            
            # Extract location information
            geometry = place.get('geometry', {})
            location = geometry.get('location', {})
            restaurant['latitude'] = location.get('lat')
            restaurant['longitude'] = location.get('lng')
            
            # Extract photos
            photos = place.get('photos', [])
            if photos:
                photo_ref = photos[0].get('photo_reference')
                if photo_ref:
                    restaurant['photo_url'] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={self.api_key}"
            
            
            # Get detailed information
            if restaurant['place_id']:
                cache_key = self.get_cache_key(restaurant['place_id'])
                if cache_key in self.place_details_cache:
                    cached_details = self.place_details_cache[cache_key]
                    restaurant.update(cached_details)
                    yield restaurant
                else:
                    # Request detailed information
                    fields = [
                        'name', 'formatted_address', 'formatted_phone_number', 'website', 
                        'opening_hours', 'reviews', 'editorial_summary', 'url',
                        'wheelchair_accessible_entrance', 'serves_takeout', 'serves_delivery',
                        'serves_dine_in', 'reservable', 'delivery', 'takeout', 'curbside_pickup',
                        'serves_breakfast', 'serves_lunch', 'serves_dinner', 'serves_beer',
                        'serves_wine', 'serves_brunch', 'serves_vegetarian_food',
                        'outdoor_seating', 'live_music', 'menu_for_children', 'restroom',
                        'good_for_children', 'good_for_groups', 'lgbtq_friendly',
                        'serves_coffee', 'serves_dessert', 'serves_happy_hour_food',
                        'serves_late_night_food', 'serves_cocktails', 'allows_dogs',
                        'has_wheelchair_accessible_parking', 'has_delivery', 'has_takeout',
                        'has_wheelchair_accessible_entrance', 'has_wheelchair_accessible_restroom',
                        'has_wheelchair_accessible_seating', 'allows_children', 'has_high_chairs',
                        'has_changing_table', 'has_kids_menu', 'good_for_kids', 'has_playground',
                        'accepts_reservations', 'accepts_credit_cards', 'accepts_debit_cards',
                        'accepts_cash_only', 'accepts_nfc', 'requires_reservations'
                    ]
                    detail_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={restaurant['place_id']}&key={self.api_key}&fields={','.join(fields)}"
                    
                    self.apply_rate_limiting()
                    self.api_call_count['place_details'] += 1
                    
                    yield scrapy.Request(
                        url=detail_url,
                        callback=self.parse_restaurant_details,
                        meta={'restaurant': restaurant, 'cache_key': cache_key},
                        dont_filter=True
                    )
            else:
                yield restaurant
        
        # Update grid results on first page
        if page == 1:
            self.completed_grids += 1
            self.grid_results[grid_id] = restaurants_found
            self.log_progress()
        
        # Handle pagination for this grid
        next_page_token = data.get('next_page_token')
        if next_page_token and page < 3:  # Limit to 3 pages per grid
            time.sleep(2)  # Required delay for next page token
            
            next_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={next_page_token}&key={self.api_key}"
            
            self.apply_rate_limiting()
            self.api_call_count['nearby_search'] += 1
            
            yield scrapy.Request(
                url=next_url,
                callback=self.parse_grid_restaurants,
                meta={
                    'grid_id': grid_id,
                    'grid_center': grid_center, 
                    'grid_index': grid_index,
                    'page': page + 1
                },
                dont_filter=True
            )
    
    def log_progress(self):
        """Log grid search progress"""
        if self.total_grids > 0:
            progress_pct = (self.completed_grids / self.total_grids) * 100
            total_restaurants = len(self.processed_place_ids)
            
            self.logger.info(f"GRID PROGRESS: {self.completed_grids}/{self.total_grids} grids ({progress_pct:.1f}%) - {total_restaurants} unique restaurants found")
    
    def parse_restaurant_details(self, response):
        """Parse detailed restaurant information"""
        restaurant = response.meta['restaurant']
        cache_key = response.meta.get('cache_key')
        
        try:
            data = json.loads(response.text)
        except json.JSONDecodeError:
            self.logger.error(f"Failed to parse details JSON: {response.text[:200]}")
            yield restaurant
            return
        
        if data.get('status') != 'OK':
            self.logger.warning(f"Details API error for {restaurant['name']}: {data.get('status')}")
            yield restaurant
            return
        
        result = data.get('result', {})
        
        # Add detailed information with enhancements
        restaurant.update({
            'formatted_address': result.get('formatted_address'),
            'phone_number': result.get('formatted_phone_number'),
            'phone_number_cleaned': self.clean_phone_number(result.get('formatted_phone_number')),
            'website': result.get('website'),
            'google_url': f"https://www.google.com/maps/place/?q=place_id:{restaurant['place_id']}"
        })
        
        # Extract and enhance location details
        restaurant['location_details'] = self.extract_location_details(result.get('formatted_address'))
        restaurant['price_range_text'] = self.interpret_price_level(restaurant.get('price_level'))
        
        # Extract and enhance opening hours
        opening_hours = result.get('opening_hours', {})
        restaurant['opening_hours'] = opening_hours.get('weekday_text', [])
        restaurant['opening_hours_parsed'] = self.parse_opening_hours(opening_hours.get('weekday_text', []))
        restaurant['is_open_24_7'] = self.check_24_7_operation(opening_hours.get('weekday_text', []))
        
        # Extract reviews
        reviews = result.get('reviews', [])
        restaurant['all_reviews'] = []
        restaurant['reviews_count'] = len(reviews)
        
        for review in reviews:
            review_data = {
                'author_name': review.get('author_name'),
                'author_url': review.get('author_url'),
                'language': review.get('language'),
                'profile_photo_url': review.get('profile_photo_url'),
                'rating': review.get('rating'),
                'relative_time_description': review.get('relative_time_description'),
                'text': review.get('text'),
                'time': review.get('time'),
                'translated': review.get('translated', False)
            }
            restaurant['all_reviews'].append(review_data)
        
        restaurant['editorial_summary'] = result.get('editorial_summary', {}).get('overview')
        restaurant['google_maps_url'] = result.get('url')
        
        # Extract all feature categories
        restaurant['service_options'] = {
            'delivery': result.get('serves_delivery') or result.get('delivery'),
            'takeout': result.get('serves_takeout') or result.get('takeout'), 
            'dine_in': result.get('serves_dine_in'),
            'curbside_pickup': result.get('curbside_pickup'),
            'reservable': result.get('reservable')
        }
        
        restaurant['accessibility'] = {
            'wheelchair_accessible_entrance': result.get('wheelchair_accessible_entrance'),
            'restroom': result.get('restroom')
        }
        
        restaurant['dining_options'] = {
            'serves_breakfast': result.get('serves_breakfast'),
            'serves_lunch': result.get('serves_lunch'),
            'serves_dinner': result.get('serves_dinner'),
            'serves_brunch': result.get('serves_brunch'),
            'serves_beer': result.get('serves_beer'),
            'serves_wine': result.get('serves_wine'),
            'serves_vegetarian_food': result.get('serves_vegetarian_food')
        }
        
        restaurant['atmosphere_features'] = {
            'outdoor_seating': result.get('outdoor_seating'),
            'live_music': result.get('live_music'),
            'good_for_children': result.get('good_for_children'),
            'good_for_groups': result.get('good_for_groups'),
            'menu_for_children': result.get('menu_for_children'),
            'lgbtq_friendly': result.get('lgbtq_friendly')
        }
        
        restaurant['offerings'] = {
            'serves_coffee': result.get('serves_coffee'),
            'serves_dessert': result.get('serves_dessert'),
            'serves_happy_hour_food': result.get('serves_happy_hour_food'),
            'serves_late_night_food': result.get('serves_late_night_food'),
            'serves_cocktails': result.get('serves_cocktails'),
            'allows_dogs': result.get('allows_dogs')
        }
        
        restaurant['parking'] = {
            'wheelchair_accessible_parking': result.get('has_wheelchair_accessible_parking'),
            'wheelchair_accessible_entrance': result.get('has_wheelchair_accessible_entrance'),
            'wheelchair_accessible_restroom': result.get('has_wheelchair_accessible_restroom'),
            'wheelchair_accessible_seating': result.get('has_wheelchair_accessible_seating')
        }
        
        restaurant['children_features'] = {
            'allows_children': result.get('allows_children'),
            'high_chairs': result.get('has_high_chairs'),
            'changing_table': result.get('has_changing_table'),
            'kids_menu': result.get('has_kids_menu'),
            'good_for_kids': result.get('good_for_kids'),
            'playground': result.get('has_playground')
        }
        
        restaurant['planning'] = {
            'accepts_reservations': result.get('accepts_reservations'),
            'requires_reservations': result.get('requires_reservations'),
            'accepts_credit_cards': result.get('accepts_credit_cards'),
            'accepts_debit_cards': result.get('accepts_debit_cards'),
            'accepts_cash_only': result.get('accepts_cash_only'),
            'accepts_nfc': result.get('accepts_nfc')
        }
        
        # Create highlights summary
        restaurant['highlights'] = []
        
        # Service highlights
        if restaurant['service_options']['delivery']:
            restaurant['highlights'].append('Delivery available')
        if restaurant['service_options']['takeout']:
            restaurant['highlights'].append('Takeout available')
        if restaurant['service_options']['dine_in']:
            restaurant['highlights'].append('Dine-in available')
        if restaurant['service_options']['reservable']:
            restaurant['highlights'].append('Reservations accepted')
        if restaurant['service_options']['curbside_pickup']:
            restaurant['highlights'].append('Curbside pickup')
            
        # Accessibility highlights
        if restaurant['accessibility']['wheelchair_accessible_entrance']:
            restaurant['highlights'].append('Wheelchair accessible')
            
        # Dining highlights
        if restaurant['dining_options']['serves_vegetarian_food']:
            restaurant['highlights'].append('Vegetarian options')
        if restaurant['dining_options']['serves_beer']:
            restaurant['highlights'].append('Serves beer')
        if restaurant['dining_options']['serves_wine']:
            restaurant['highlights'].append('Serves wine')
            
        # Atmosphere highlights
        if restaurant['atmosphere_features']['outdoor_seating']:
            restaurant['highlights'].append('Outdoor seating')
        if restaurant['atmosphere_features']['live_music']:
            restaurant['highlights'].append('Live music')
        if restaurant['atmosphere_features']['good_for_children']:
            restaurant['highlights'].append('Good for kids')
        if restaurant['atmosphere_features']['good_for_groups']:
            restaurant['highlights'].append('Good for groups')
        if restaurant['atmosphere_features']['lgbtq_friendly']:
            restaurant['highlights'].append('LGBTQ+ friendly')
            
        # Offerings highlights
        if restaurant['offerings']['serves_coffee']:
            restaurant['highlights'].append('Serves coffee')
        if restaurant['offerings']['serves_dessert']:
            restaurant['highlights'].append('Serves dessert')
        if restaurant['offerings']['serves_happy_hour_food']:
            restaurant['highlights'].append('Happy hour food')
        if restaurant['offerings']['serves_late_night_food']:
            restaurant['highlights'].append('Late night food')
        if restaurant['offerings']['serves_cocktails']:
            restaurant['highlights'].append('Serves cocktails')
        if restaurant['offerings']['allows_dogs']:
            restaurant['highlights'].append('Dog-friendly')
            
        # Children highlights
        if restaurant['children_features']['good_for_kids']:
            restaurant['highlights'].append('Kid-friendly')
        if restaurant['children_features']['kids_menu']:
            restaurant['highlights'].append('Kids menu')
        if restaurant['children_features']['high_chairs']:
            restaurant['highlights'].append('High chairs available')
        if restaurant['children_features']['playground']:
            restaurant['highlights'].append('Has playground')
            
        # Planning highlights
        if restaurant['planning']['accepts_reservations']:
            restaurant['highlights'].append('Accepts reservations')
        if restaurant['planning']['accepts_credit_cards']:
            restaurant['highlights'].append('Accepts credit cards')
        if restaurant['planning']['accepts_cash_only']:
            restaurant['highlights'].append('Cash only')
        
        # Create reviews summary
        if reviews:
            ratings = [r.get('rating', 0) for r in reviews if r.get('rating')]
            if ratings:
                restaurant['reviews_summary'] = {
                    'total_reviews_fetched': len(reviews),
                    'avg_rating_from_reviews': sum(ratings) / len(ratings),
                    'rating_distribution': {
                        '5_star': len([r for r in ratings if r == 5]),
                        '4_star': len([r for r in ratings if r == 4]),
                        '3_star': len([r for r in ratings if r == 3]),
                        '2_star': len([r for r in ratings if r == 2]),
                        '1_star': len([r for r in ratings if r == 1])
                    }
                }
        
        # Cache the enhanced data
        if cache_key:
            cache_data = {k: v for k, v in restaurant.items() 
                         if k not in ['name', 'place_id', 'source', 'grid_id', 'grid_center', 'grid_index', 'page']}
            self.place_details_cache[cache_key] = cache_data
        
        yield restaurant
    
    # Include all the helper methods from the original spider
    def get_cache_key(self, place_id):
        """Generate cache key for place details"""
        return hashlib.md5(place_id.encode()).hexdigest()
    
    def apply_rate_limiting(self):
        """Apply rate limiting to respect Google's API limits"""
        current_time = time.time()
        
        # Remove timestamps older than 1 second
        self.request_timestamps = [ts for ts in self.request_timestamps if current_time - ts < 1.0]
        
        # If we're at the rate limit, wait
        if len(self.request_timestamps) >= self.max_requests_per_second:
            sleep_time = 1.0 - (current_time - self.request_timestamps[0])
            if sleep_time > 0:
                time.sleep(sleep_time)
        
        # Add current timestamp
        self.request_timestamps.append(current_time)
    
    def closed(self, reason):
        """Called when spider closes - log comprehensive statistics"""
        total_requests = sum(self.api_call_count.values())
        unique_places = len(self.processed_place_ids)
        cache_hits = len(self.place_details_cache)
        
        self.logger.info("=" * 60)
        self.logger.info("GRID-BASED COMPREHENSIVE SEARCH COMPLETED")
        self.logger.info("=" * 60)
        self.logger.info(f"Total grids searched: {self.completed_grids}/{self.total_grids}")
        self.logger.info(f"Grid coverage: {(self.completed_grids/self.total_grids)*100:.1f}%")
        self.logger.info(f"Total API requests: {total_requests}")
        self.logger.info(f"Nearby search requests: {self.api_call_count['nearby_search']}")
        self.logger.info(f"Place details requests: {self.api_call_count['place_details']}")
        self.logger.info(f"Unique restaurants found: {unique_places}")
        self.logger.info(f"Cache entries created: {cache_hits}")
        self.logger.info(f"API requests saved by caching: {cache_hits}")
        if total_requests > 0:
            efficiency = (cache_hits / total_requests) * 100
            self.logger.info(f"Cache efficiency: {efficiency:.1f}%")
        
        # Log top performing grids
        if self.grid_results:
            sorted_grids = sorted(self.grid_results.items(), key=lambda x: x[1], reverse=True)
            self.logger.info(f"Top 5 most productive grids:")
            for grid_id, count in sorted_grids[:5]:
                self.logger.info(f"  {grid_id}: {count} restaurants")
        
        self.logger.info("=" * 60)
    
    # All the enhancement methods
    def clean_phone_number(self, phone):
        """Clean and standardize phone number format"""
        if not phone:
            return None
        
        import re
        cleaned = re.sub(r'[^\d+]', '', phone)
        
        if cleaned.startswith('+234'):
            return cleaned
        elif cleaned.startswith('234'):
            return '+' + cleaned
        elif cleaned.startswith('0') and len(cleaned) == 11:
            return '+234' + cleaned[1:]
        
        return phone
    
    def extract_location_details(self, address):
        """Extract detailed location information from address"""
        if not address:
            return {}
        
        details = {
            'full_address': address,
            'area': None,
            'state': None,
            'country': None,
            'postal_code': None
        }
        
        lagos_areas = [
            'Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Surulere', 'Ikeja', 
            'Yaba', 'Lagos Island', 'Apapa', 'Festac', 'Gbagada', 'Magodo',
            'Ojodu', 'Ogba', 'Agege', 'Alaba', 'Badagry', 'Epe', 'Ikorodu',
            'Mushin', 'Oshodi', 'Isolo', 'Ketu', 'Mile 12', 'Berger', 'Ojota'
        ]
        
        address_upper = address.upper()
        for area in lagos_areas:
            if area.upper() in address_upper:
                details['area'] = area
                break
        
        if 'LAGOS' in address_upper:
            details['state'] = 'Lagos State'
        if 'NIGERIA' in address_upper:
            details['country'] = 'Nigeria'
            
        import re
        postal_match = re.search(r'\b\d{6}\b', address)
        if postal_match:
            details['postal_code'] = postal_match.group()
            
        return details
    
    def interpret_price_level(self, price_level):
        """Convert Google's price level (0-4) to human-readable text"""
        price_map = {
            0: 'Free',
            1: 'Inexpensive (₦)',
            2: 'Moderate (₦₦)',
            3: 'Expensive (₦₦₦)',
            4: 'Very Expensive (₦₦₦₦)'
        }
        return price_map.get(price_level, 'Price not available')
    
    def parse_opening_hours(self, weekday_text_list):
        """Parse opening hours into structured format"""
        if not weekday_text_list:
            return {}
        
        parsed_hours = {}
        days_map = {
            'Monday': 'monday', 'Tuesday': 'tuesday', 'Wednesday': 'wednesday',
            'Thursday': 'thursday', 'Friday': 'friday', 'Saturday': 'saturday', 'Sunday': 'sunday'
        }
        
        for day_text in weekday_text_list:
            for day_name, day_key in days_map.items():
                if day_text.startswith(day_name):
                    time_part = day_text.replace(f'{day_name}: ', '')
                    if 'Closed' in time_part:
                        parsed_hours[day_key] = {'status': 'closed', 'hours': None}
                    elif 'Open 24 hours' in time_part:
                        parsed_hours[day_key] = {'status': 'open_24h', 'hours': '24 hours'}
                    else:
                        parsed_hours[day_key] = {'status': 'open', 'hours': time_part}
                    break
        
        return parsed_hours
    
    def check_24_7_operation(self, weekday_text_list):
        """Check if restaurant operates 24/7"""
        if not weekday_text_list:
            return False
        
        open_24h_count = sum(1 for day_text in weekday_text_list if 'Open 24 hours' in day_text)
        return open_24h_count == 7