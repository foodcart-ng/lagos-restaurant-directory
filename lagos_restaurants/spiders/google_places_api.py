import scrapy
import json
import os
import time
import hashlib
from collections import defaultdict

# Google Places API Spider
# Requires Google Places API key to be set as environment variable: GOOGLE_PLACES_API_KEY
# To get an API key: https://console.cloud.google.com/apis/credentials


class GooglePlacesApiSpider(scrapy.Spider):
    name = "google_places_api"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.api_key = os.getenv('GOOGLE_PLACES_API_KEY')
        if not self.api_key:
            raise ValueError("Google Places API key is required. Set GOOGLE_PLACES_API_KEY environment variable.")
        
        # Performance optimization features
        self.place_details_cache = {}  # Cache for place details to avoid duplicate API calls
        self.processed_place_ids = set()  # Track processed places to avoid duplicates
        self.api_call_count = defaultdict(int)  # Track API usage
        self.request_timestamps = []  # For rate limiting
        self.max_requests_per_second = 10  # Google's rate limit
    
    # Lagos Nigeria coordinates
    lagos_center = {
        'lat': 6.5244,
        'lng': 3.3792
    }
    
    # Search radius in meters (50km to cover Lagos metropolitan area)
    search_radius = 50000
    
    custom_settings = {
        'DOWNLOAD_DELAY': 0.1,  # Reduced delay for faster processing
        'CONCURRENT_REQUESTS': 5,  # Increased concurrency within rate limits
        'CONCURRENT_REQUESTS_PER_DOMAIN': 5,
        'ROBOTSTXT_OBEY': False,
        'RETRY_TIMES': 3,
        'RETRY_HTTP_CODES': [500, 502, 503, 504, 408, 429],  # Include rate limit errors
        'AUTOTHROTTLE_ENABLED': True,
        'AUTOTHROTTLE_START_DELAY': 0.1,
        'AUTOTHROTTLE_MAX_DELAY': 2.0,
        'AUTOTHROTTLE_TARGET_CONCURRENCY': 5.0,
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
        # Google Places Nearby Search API endpoint
        base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        
        # Search parameters
        params = {
            'key': self.api_key,
            'location': f"{self.lagos_center['lat']},{self.lagos_center['lng']}",
            'radius': self.search_radius,
            'type': 'restaurant',
            'keyword': 'restaurant'
        }
        
        # Construct URL with parameters
        url = f"{base_url}?" + "&".join([f"{k}={v}" for k, v in params.items()])
        
        # Apply rate limiting before making request
        self.apply_rate_limiting()
        self.api_call_count['nearby_search'] += 1
        
        yield scrapy.Request(
            url=url,
            callback=self.parse_restaurants,
            meta={'page': 1},
            dont_filter=True  # Allow duplicate URLs for pagination
        )
    
    def parse_restaurants(self, response):
        page = response.meta.get('page', 1)
        
        try:
            data = json.loads(response.text)
        except json.JSONDecodeError:
            self.logger.error(f"Failed to parse JSON response: {response.text[:200]}")
            return
        
        status = data.get('status')
        if status != 'OK':
            self.logger.error(f"API Error: {status} - {data.get('error_message', 'Unknown error')}")
            return
        
        results = data.get('results', [])
        self.logger.info(f"Found {len(results)} restaurants on page {page}")
        
        for place in results:
            place_id = place.get('place_id')
            
            # Skip if already processed (deduplication)
            if place_id in self.processed_place_ids:
                self.logger.info(f"Skipping duplicate place: {place.get('name')} ({place_id})")
                continue
            
            self.processed_place_ids.add(place_id)
            
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
                'source': 'google_places_api',
                'page': page
            }
            
            # Extract location information
            geometry = place.get('geometry', {})
            location = geometry.get('location', {})
            restaurant['latitude'] = location.get('lat')
            restaurant['longitude'] = location.get('lng')
            
            # Extract photos if available
            photos = place.get('photos', [])
            if photos:
                # Get first photo reference
                photo_ref = photos[0].get('photo_reference')
                if photo_ref:
                    restaurant['photo_url'] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={self.api_key}"
            
            
            # Make a detailed request for more information including all reviews and service options
            if restaurant['place_id']:
                # Check cache first to avoid duplicate API calls
                cache_key = self.get_cache_key(restaurant['place_id'])
                if cache_key in self.place_details_cache:
                    self.logger.info(f"Using cached data for {restaurant['name']}")
                    cached_details = self.place_details_cache[cache_key]
                    restaurant.update(cached_details)
                    yield restaurant
                else:
                    # Include valid fields for restaurant details (using basic Place Details fields)
                    fields = [
                        'name', 'formatted_address', 'formatted_phone_number', 'website', 
                        'opening_hours', 'reviews', 'editorial_summary', 'url'
                    ]
                    detail_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={restaurant['place_id']}&key={self.api_key}&fields={','.join(fields)}"
                    
                    # Apply rate limiting and track API calls
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
        
        # Check for next page (limit for testing)
        next_page_token = data.get('next_page_token')
        if next_page_token and page < 1:  # Limit to 1 page for testing
            # Google requires a brief delay before using next page token
            time.sleep(2)
            
            next_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={next_page_token}&key={self.api_key}"
            
            # Apply rate limiting and track API calls
            self.apply_rate_limiting()
            self.api_call_count['nearby_search'] += 1
            
            yield scrapy.Request(
                url=next_url,
                callback=self.parse_restaurants,
                meta={'page': page + 1},
                dont_filter=True
            )
    
    def parse_restaurant_details(self, response):
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
        
        # Extract ALL available reviews (Google Places API returns up to 5 most helpful reviews)
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
        
        # Add editorial summary if available
        restaurant['editorial_summary'] = result.get('editorial_summary', {}).get('overview')
        
        # Add direct Google Maps URL
        restaurant['google_maps_url'] = result.get('url')
        
        # Create simple highlights from available data
        restaurant['highlights'] = []
        
        # Basic highlights from price level and rating
        if restaurant.get('rating') and restaurant['rating'] >= 4.5:
            restaurant['highlights'].append('Highly rated')
        if restaurant.get('price_level') == 1:
            restaurant['highlights'].append('Budget-friendly')
        elif restaurant.get('price_level') == 4:
            restaurant['highlights'].append('Fine dining')
        
        # Add highlights from restaurant types
        types = restaurant.get('types', [])
        if 'meal_delivery' in types:
            restaurant['highlights'].append('Delivery available')
        if 'meal_takeaway' in types:
            restaurant['highlights'].append('Takeout available')
        if 'bar' in types:
            restaurant['highlights'].append('Bar available')
        if 'cafe' in types:
            restaurant['highlights'].append('Cafe')
        
        # Create a comprehensive reviews summary
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
        
        # Cache the enhanced data for future use
        if cache_key:
            cache_data = {
                'formatted_address': restaurant.get('formatted_address'),
                'phone_number': restaurant.get('phone_number'),
                'phone_number_cleaned': restaurant.get('phone_number_cleaned'),
                'website': restaurant.get('website'),
                'location_details': restaurant.get('location_details'),
                'price_range_text': restaurant.get('price_range_text'),
                'opening_hours_parsed': restaurant.get('opening_hours_parsed'),
                'is_open_24_7': restaurant.get('is_open_24_7'),
                'highlights': restaurant.get('highlights'),
                'all_reviews': restaurant.get('all_reviews'),
                'reviews_summary': restaurant.get('reviews_summary'),
                'editorial_summary': restaurant.get('editorial_summary'),
                'google_maps_url': restaurant.get('google_maps_url')
            }
            self.place_details_cache[cache_key] = cache_data
            self.logger.info(f"Cached details for {restaurant['name']}")
        
        yield restaurant
    
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
                self.logger.info(f"Rate limiting: sleeping for {sleep_time:.2f} seconds")
                time.sleep(sleep_time)
        
        # Add current timestamp
        self.request_timestamps.append(current_time)
    
    def closed(self, reason):
        """Called when spider closes - log performance statistics"""
        total_requests = sum(self.api_call_count.values())
        unique_places = len(self.processed_place_ids)
        cache_hits = len(self.place_details_cache)
        
        self.logger.info("=" * 50)
        self.logger.info("PERFORMANCE STATISTICS")
        self.logger.info("=" * 50)
        self.logger.info(f"Total API requests: {total_requests}")
        self.logger.info(f"Nearby search requests: {self.api_call_count['nearby_search']}")
        self.logger.info(f"Place details requests: {self.api_call_count['place_details']}")
        self.logger.info(f"Unique places processed: {unique_places}")
        self.logger.info(f"Cache entries created: {cache_hits}")
        self.logger.info(f"API requests saved by caching: {cache_hits}")
        if total_requests > 0:
            efficiency = (cache_hits / total_requests) * 100
            self.logger.info(f"Cache efficiency: {efficiency:.1f}%")
        self.logger.info("=" * 50)
    
    def clean_phone_number(self, phone):
        """Clean and standardize phone number format"""
        if not phone:
            return None
        
        import re
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', phone)
        
        # Format Nigerian numbers
        if cleaned.startswith('+234'):
            return cleaned
        elif cleaned.startswith('234'):
            return '+' + cleaned
        elif cleaned.startswith('0') and len(cleaned) == 11:
            # Convert local format (0xxx) to international (+234xxx)
            return '+234' + cleaned[1:]
        
        return phone  # Return original if can't parse
    
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
        
        # Common Lagos areas/districts
        lagos_areas = [
            'Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Surulere', 'Ikeja', 
            'Yaba', 'Lagos Island', 'Apapa', 'Festac', 'Gbagada', 'Magodo',
            'Ojodu', 'Ogba', 'Agege', 'Alaba', 'Badagry', 'Epe', 'Ikorodu'
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
            
        # Extract postal code if present
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


# Alternative spider for text search (more specific results)
class GooglePlacesTextSearchSpider(GooglePlacesApiSpider):
    name = "google_places_text_search"
    
    search_queries = [
        "restaurants in Lagos Nigeria",
        "Nigerian restaurants Lagos",
        "fine dining Lagos Nigeria", 
        "restaurants Lagos",
        # "restaurants Ikoyi Lagos",
        # "restaurants Surulere Lagos",
        "local food Lagos Nigeria"
    ]
    
    def start_requests(self):
        base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        
        for query in self.search_queries:
            params = {
                'key': self.api_key,
                'query': query,
                'location': f"{self.lagos_center['lat']},{self.lagos_center['lng']}",
                'radius': self.search_radius
            }
            
            url = f"{base_url}?" + "&".join([f"{k}={v}" for k, v in params.items()])
            
            yield scrapy.Request(
                url=url,
                callback=self.parse_restaurants,
                meta={'page': 1, 'query': query}
            )
    
    def parse_restaurants(self, response):
        page = response.meta.get('page', 1)  
        query = response.meta.get('query', '')
        
        try:
            data = json.loads(response.text)
        except json.JSONDecodeError:
            self.logger.error(f"Failed to parse JSON response: {response.text[:200]}")
            return
        
        status = data.get('status')
        if status != 'OK':
            self.logger.error(f"API Error for '{query}': {status} - {data.get('error_message', 'Unknown error')}")
            return
        
        results = data.get('results', [])
        self.logger.info(f"Found {len(results)} restaurants for query '{query}' on page {page}")
        
        for place in results:
            # Extract basic information
            restaurant = {
                'name': place.get('name'),
                'place_id': place.get('place_id'),
                'rating': place.get('rating'),
                'user_ratings_total': place.get('user_ratings_total'),
                'price_level': place.get('price_level'),
                'formatted_address': place.get('formatted_address'),
                'types': place.get('types', []),
                'business_status': place.get('business_status'),
                'source': 'google_places_text_search',
                'search_query': query,
                'page': page
            }
            
            # Extract location information
            geometry = place.get('geometry', {})
            location = geometry.get('location', {})
            restaurant['latitude'] = location.get('lat')
            restaurant['longitude'] = location.get('lng')
            
            # Extract photos if available
            photos = place.get('photos', [])
            if photos:
                photo_ref = photos[0].get('photo_reference')
                if photo_ref:
                    restaurant['photo_url'] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={self.api_key}"
            
            
            # Get detailed information including all reviews and service options
            if restaurant['place_id']:
                # Include comprehensive fields for restaurant details
                fields = [
                    'name', 'formatted_address', 'formatted_phone_number', 'website', 
                    'opening_hours', 'reviews', 'editorial_summary', 'url',
                    # Service Options
                    'wheelchair_accessible_entrance', 'serves_takeout', 'serves_delivery',
                    'serves_dine_in', 'reservable', 'delivery', 'takeout', 'curbside_pickup',
                    # Dining Options
                    'serves_breakfast', 'serves_lunch', 'serves_dinner', 'serves_beer',
                    'serves_wine', 'serves_brunch', 'serves_vegetarian_food',
                    # Atmosphere
                    'outdoor_seating', 'live_music', 'menu_for_children', 'restroom',
                    'good_for_children', 'good_for_groups', 'lgbtq_friendly',
                    # Offerings
                    'serves_coffee', 'serves_dessert', 'serves_happy_hour_food',
                    'serves_late_night_food', 'serves_cocktails', 'allows_dogs',
                    # Parking
                    'has_wheelchair_accessible_parking', 'has_delivery', 'has_takeout',
                    'has_wheelchair_accessible_entrance', 'has_wheelchair_accessible_restroom',
                    'has_wheelchair_accessible_seating',
                    # Children
                    'allows_children', 'has_high_chairs', 'has_changing_table',
                    'has_kids_menu', 'good_for_kids', 'has_playground',
                    # Planning
                    'accepts_reservations', 'accepts_credit_cards', 'accepts_debit_cards',
                    'accepts_cash_only', 'accepts_nfc', 'requires_reservations'
                ]
                detail_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={restaurant['place_id']}&key={self.api_key}&fields={','.join(fields)}"
                
                yield scrapy.Request(
                    url=detail_url,
                    callback=self.parse_restaurant_details,
                    meta={'restaurant': restaurant}
                )
            else:
                yield restaurant
        
        # Check for next page
        next_page_token = data.get('next_page_token')
        if next_page_token and page < 3:  # Limit to 3 pages per query
            import time
            time.sleep(2)
            
            next_url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={self.api_key}"
            
            yield scrapy.Request(
                url=next_url,
                callback=self.parse_restaurants,
                meta={'page': page + 1, 'query': query}
            )