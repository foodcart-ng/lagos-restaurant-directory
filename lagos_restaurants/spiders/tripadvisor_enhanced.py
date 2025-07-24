import scrapy
import json
import re
import random
from urllib.parse import urljoin

class TripAdvisorEnhancedSpider(scrapy.Spider):
    name = "tripadvisor_enhanced"
    allowed_domains = ["tripadvisor.com"]
    start_urls = [
        "https://www.tripadvisor.com/Restaurants-g304026-Lagos_Lagos_State.html"
    ]
    
    custom_settings = {
        'DOWNLOAD_DELAY': 2,
        'RANDOMIZE_DOWNLOAD_DELAY': True,
        'ROBOTSTXT_OBEY': False,
        'CONCURRENT_REQUESTS': 1,
        'CONCURRENT_REQUESTS_PER_DOMAIN': 1,
        'DEFAULT_REQUEST_HEADERS': {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        },
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,
            'scrapy_user_agents.middlewares.RandomUserAgentMiddleware': 400,
        }
    }
    
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    ]
    
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url=url,
                headers={'User-Agent': random.choice(self.user_agents)},
                callback=self.parse_listing_page,
                meta={'page_num': 1}
            )
    
    def parse_listing_page(self, response):
        """Parse restaurant listing page and extract restaurant links"""
        page_num = response.meta.get('page_num', 1)
        self.logger.info(f"Parsing listing page {page_num}")
        
        # Extract restaurant cards/containers
        restaurant_cards = response.css('div[data-test="SL_list_item"]')
        
        if not restaurant_cards:
            # Fallback selector for different page layouts
            restaurant_cards = response.css('div.listing_info, div.review_item, a[href*="Restaurant_Review"]')
        
        self.logger.info(f"Found {len(restaurant_cards)} restaurant cards on page {page_num}")
        
        processed_urls = set()
        
        for card in restaurant_cards:
            # Extract restaurant URL
            restaurant_url = card.css('a[href*="Restaurant_Review"]::attr(href)').get()
            
            if not restaurant_url or restaurant_url in processed_urls:
                continue
                
            processed_urls.add(restaurant_url)
            full_url = urljoin(response.url, restaurant_url)
            
            # Extract basic info from listing page
            name = self.extract_restaurant_name(card)
            rating = self.extract_rating(card)
            review_count = self.extract_review_count(card)
            cuisine_types = self.extract_cuisine_types(card)
            price_range = self.extract_price_range(card)
            
            # Create basic restaurant data
            restaurant_data = {
                'name': name,
                'listing_rating': rating,
                'listing_review_count': review_count,
                'listing_cuisine_types': cuisine_types,
                'listing_price_range': price_range,
                'source': 'tripadvisor_enhanced',
                'tripadvisor_url': full_url
            }
            
            # Request detailed restaurant page
            yield scrapy.Request(
                url=full_url,
                headers={'User-Agent': random.choice(self.user_agents)},
                callback=self.parse_restaurant_detail,
                meta={'restaurant_data': restaurant_data}
            )
        
        # Handle pagination
        next_page = response.css('a[aria-label="Next page"]::attr(href)').get()
        if not next_page:
            next_page = response.css('a.nav.next::attr(href)').get()
        
        if next_page and page_num < 5:  # Limit pages for testing
            next_url = urljoin(response.url, next_page)
            yield scrapy.Request(
                url=next_url,
                headers={'User-Agent': random.choice(self.user_agents)},
                callback=self.parse_listing_page,
                meta={'page_num': page_num + 1}
            )
    
    def parse_restaurant_detail(self, response):
        """Parse individual restaurant detail page"""
        restaurant_data = response.meta['restaurant_data']
        
        self.logger.info(f"Parsing details for: {restaurant_data.get('name')}")
        
        # Extract comprehensive restaurant data
        restaurant_data.update({
            # Basic Information
            'description': self.extract_description(response),
            'address': self.extract_address(response),
            'phone': self.extract_phone(response),
            'website': self.extract_website(response),
            'email': self.extract_email(response),
            
            # Detailed ratings and reviews
            'rating': self.extract_detailed_rating(response),
            'review_count': self.extract_detailed_review_count(response),
            'rating_breakdown': self.extract_rating_breakdown(response),
            
            # Operating details
            'opening_hours': self.extract_opening_hours(response),
            'price_range': self.extract_detailed_price_range(response),
            'cuisine_types': self.extract_detailed_cuisine_types(response),
            
            # Features and amenities
            'features': self.extract_features(response),
            'dining_options': self.extract_dining_options(response),
            'special_diets': self.extract_special_diets(response),
            
            # Location and area
            'area': self.extract_area(response),
            'neighborhood': self.extract_neighborhood(response),
            
            # Photos
            'photos': self.extract_photos(response),
            
            # Reviews sample
            'recent_reviews': self.extract_recent_reviews(response),
            
            # Additional metadata
            'tripadvisor_id': self.extract_tripadvisor_id(response.url),
            'ranking': self.extract_ranking(response)
        })
        
        yield restaurant_data
    
    def extract_restaurant_name(self, card):
        """Extract restaurant name from listing card"""
        name_selectors = [
            'a[href*="Restaurant_Review"] span::text',
            'a[href*="Restaurant_Review"]::text',
            '.listing_title a::text',
            'h3 a::text',
            'h2 a::text'
        ]
        
        for selector in name_selectors:
            name = card.css(selector).get()
            if name and name.strip():
                return name.strip()
        return None
    
    def extract_rating(self, card):
        """Extract rating from listing card"""
        rating_selectors = [
            'span[class*="ui_bubble_rating bubble_"]::attr(class)',
            '.ui_bubble_rating::attr(class)',
            'span.overallRating::text'
        ]
        
        for selector in rating_selectors:
            rating_element = card.css(selector).get()
            if rating_element:
                # Extract rating from class name (e.g., "bubble_40" = 4.0)
                rating_match = re.search(r'bubble_(\d+)', rating_element)
                if rating_match:
                    return float(rating_match.group(1)) / 10
        return None
    
    def extract_review_count(self, card):
        """Extract review count from listing card"""
        review_selectors = [
            'a[href*="Reviews"] span::text',
            'span.reviewCount::text',
            'span[class*="review"]::text'
        ]
        
        for selector in review_selectors:
            review_text = card.css(selector).get()
            if review_text:
                # Extract number from text like "1,234 reviews"
                review_match = re.search(r'([\d,]+)', review_text)
                if review_match:
                    return int(review_match.group(1).replace(',', ''))
        return None
    
    def extract_cuisine_types(self, card):
        """Extract cuisine types from listing card"""
        cuisine_selectors = [
            '.cuisines::text',
            'div[data-test*="cuisine"]::text',
            '.tag::text'
        ]
        
        cuisines = []
        for selector in cuisine_selectors:
            cuisine_elements = card.css(selector).getall()
            for cuisine in cuisine_elements:
                if cuisine and cuisine.strip():
                    cuisines.append(cuisine.strip())
        
        return cuisines if cuisines else None
    
    def extract_price_range(self, card):
        """Extract price range from listing card"""
        price_selectors = [
            '.price::text',
            'span[class*="price"]::text',
            '.priceRange::text'
        ]
        
        for selector in price_selectors:
            price = card.css(selector).get()
            if price and price.strip():
                return price.strip()
        return None
    
    def extract_description(self, response):
        """Extract restaurant description"""
        desc_selectors = [
            'div[data-test*="description"] p::text',
            '.restaurants-detail-overview-cards-DetailOverviewCard__tagText::text',
            '.ui_columns div p::text'
        ]
        
        for selector in desc_selectors:
            description = response.css(selector).get()
            if description and len(description.strip()) > 20:
                return description.strip()
        return None
    
    def extract_address(self, response):
        """Extract restaurant address"""
        address_selectors = [
            'span[class*="street-address"]::text',
            '.street-address::text',
            'div[data-test*="address"]::text',
            '.restaurants-detail-overview-cards-DetailOverviewCard__tagText--address::text'
        ]
        
        for selector in address_selectors:
            address = response.css(selector).get()
            if address and address.strip():
                return address.strip()
        return None
    
    def extract_phone(self, response):
        """Extract phone number"""
        phone_selectors = [
            'span[class*="phone"]::text',
            'div[data-test*="phone"]::text',
            'a[href^="tel:"]::attr(href)'
        ]
        
        for selector in phone_selectors:
            phone = response.css(selector).get()
            if phone:
                if phone.startswith('tel:'):
                    phone = phone[4:]
                if phone.strip():
                    return phone.strip()
        return None
    
    def extract_website(self, response):
        """Extract website URL"""
        website_selectors = [
            'a[data-test*="website"]::attr(href)',
            'a[href^="http"][class*="website"]::attr(href)',
            'div[data-test*="website"] a::attr(href)'
        ]
        
        for selector in website_selectors:
            website = response.css(selector).get()
            if website and 'tripadvisor' not in website.lower():
                return website
        return None
    
    def extract_email(self, response):
        """Extract email address"""
        email_selectors = [
            'a[href^="mailto:"]::attr(href)',
            'span[class*="email"]::text'
        ]
        
        for selector in email_selectors:
            email = response.css(selector).get()
            if email:
                if email.startswith('mailto:'):
                    email = email[7:]
                if '@' in email:
                    return email.strip()
        return None
    
    def extract_detailed_rating(self, response):
        """Extract detailed rating from restaurant page"""
        rating_selectors = [
            'span[class*="ui_bubble_rating bubble_"]::attr(class)',
            '.overallRating::text',
            'div[data-testid*="rating"] span::text'
        ]
        
        for selector in rating_selectors:
            rating_element = response.css(selector).get()
            if rating_element:
                if 'bubble_' in rating_element:
                    rating_match = re.search(r'bubble_(\d+)', rating_element)
                    if rating_match:
                        return float(rating_match.group(1)) / 10
                else:
                    # Try to extract numeric rating
                    rating_match = re.search(r'(\d+\.?\d*)', rating_element)
                    if rating_match:
                        return float(rating_match.group(1))
        return None
    
    def extract_detailed_review_count(self, response):
        """Extract detailed review count"""
        review_selectors = [
            'span[class*="reviewCount"]::text',
            'div[data-testid*="review"] span::text',
            'a[href*="Reviews"] span::text'
        ]
        
        for selector in review_selectors:
            review_text = response.css(selector).get()
            if review_text:
                review_match = re.search(r'([\d,]+)', review_text)
                if review_match:
                    return int(review_match.group(1).replace(',', ''))
        return None
    
    def extract_rating_breakdown(self, response):
        """Extract rating breakdown by stars"""
        breakdown = {}
        
        # Look for rating distribution bars/charts
        rating_rows = response.css('div[class*="histogram"] div[class*="row"]')
        
        for row in rating_rows:
            star_text = row.css('span::text').get()
            count_text = row.css('div[class*="count"]::text').get()
            
            if star_text and count_text:
                star_match = re.search(r'(\d+)', star_text)
                count_match = re.search(r'(\d+)', count_text)
                
                if star_match and count_match:
                    breakdown[f"{star_match.group(1)}_star"] = int(count_match.group(1))
        
        return breakdown if breakdown else None
    
    def extract_opening_hours(self, response):
        """Extract opening hours"""
        hours_selectors = [
            'div[data-test*="hours"] div::text',
            '.hours .detail::text',
            'div[class*="hours"] span::text'
        ]
        
        hours = {}
        days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        
        for selector in hours_selectors:
            hours_elements = response.css(selector).getall()
            
            for element in hours_elements:
                element = element.strip()
                if any(day.capitalize() in element for day in days):
                    # Parse hours like "Monday: 9:00 AM - 10:00 PM"
                    for day in days:
                        if day.capitalize() in element:
                            time_part = element.split(':', 1)[-1].strip()
                            hours[day] = time_part
                            break
        
        return hours if hours else None
    
    def extract_detailed_price_range(self, response):
        """Extract detailed price range"""
        price_selectors = [
            'div[data-test*="price"] span::text',
            '.priceRange::text',
            'span[class*="price"]::text'
        ]
        
        for selector in price_selectors:
            price = response.css(selector).get()
            if price and price.strip():
                return price.strip()
        return None
    
    def extract_detailed_cuisine_types(self, response):
        """Extract detailed cuisine types"""
        cuisine_selectors = [
            'div[data-test*="cuisine"] span::text',
            '.cuisines a::text',
            'div[class*="cuisine"] span::text'
        ]
        
        cuisines = []
        for selector in cuisine_selectors:
            cuisine_elements = response.css(selector).getall()
            for cuisine in cuisine_elements:
                if cuisine and cuisine.strip():
                    cuisines.append(cuisine.strip())
        
        return list(set(cuisines)) if cuisines else None  # Remove duplicates
    
    def extract_features(self, response):
        """Extract restaurant features and amenities"""
        features = {}
        
        feature_selectors = [
            'div[data-test*="amenity"] span::text',
            'div[class*="amenity"] span::text',
            'div[data-test*="feature"] span::text'
        ]
        
        feature_list = []
        for selector in feature_selectors:
            features_elements = response.css(selector).getall()
            feature_list.extend([f.strip() for f in features_elements if f.strip()])
        
        # Map common features to boolean flags
        feature_keywords = {
            'parking': ['parking', 'valet'],
            'wifi': ['wifi', 'internet'],
            'outdoor_seating': ['outdoor', 'terrace', 'patio'],
            'air_conditioning': ['air conditioning', 'ac'],
            'live_music': ['live music', 'entertainment'],
            'delivery': ['delivery'],
            'takeaway': ['takeaway', 'takeout'],
            'reservations': ['reservations', 'booking'],
            'wheelchair_accessible': ['wheelchair', 'accessible'],
            'kids_friendly': ['kids', 'children', 'family'],
            'alcohol_served': ['bar', 'wine', 'beer', 'alcohol'],
        }
        
        for feature_key, keywords in feature_keywords.items():
            features[feature_key] = any(
                any(keyword.lower() in item.lower() for keyword in keywords)
                for item in feature_list
            )
        
        return features if any(features.values()) else None
    
    def extract_dining_options(self, response):
        """Extract dining options"""
        dining_selectors = [
            'div[data-test*="dining"] span::text',
            'div[class*="dining"] span::text'
        ]
        
        dining_options = []
        for selector in dining_selectors:
            options = response.css(selector).getall()
            dining_options.extend([opt.strip() for opt in options if opt.strip()])
        
        return dining_options if dining_options else None
    
    def extract_special_diets(self, response):
        """Extract special dietary options"""
        diet_selectors = [
            'div[data-test*="diet"] span::text',
            'div[class*="dietary"] span::text'
        ]
        
        diets = []
        for selector in diet_selectors:
            diet_elements = response.css(selector).getall()
            diets.extend([diet.strip() for diet in diet_elements if diet.strip()])
        
        return diets if diets else None
    
    def extract_area(self, response):
        """Extract area/locality from address or breadcrumbs"""
        area_selectors = [
            '.breadcrumbs a::text',
            'div[data-test*="location"] span::text',
            '.geo a::text'
        ]
        
        # Lagos areas to match against
        lagos_areas = [
            'Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Surulere', 'Ikeja',
            'Yaba', 'Lagos Island', 'Apapa', 'Festac', 'Gbagada', 'Magodo',
            'Ojodu', 'Ogba', 'Agege', 'Alaba', 'Badagry', 'Epe', 'Ikorodu'
        ]
        
        for selector in area_selectors:
            location_elements = response.css(selector).getall()
            for element in location_elements:
                for area in lagos_areas:
                    if area.lower() in element.lower():
                        return area
        
        return None
    
    def extract_neighborhood(self, response):
        """Extract neighborhood information"""
        return self.extract_area(response)  # Same logic for now
    
    def extract_photos(self, response):
        """Extract photo URLs"""
        photo_selectors = [
            'img[src*="media-cdn.tripadvisor.com"]::attr(src)',
            'div[data-test*="photo"] img::attr(src)'
        ]
        
        photos = []
        for selector in photo_selectors:
            photo_urls = response.css(selector).getall()
            for url in photo_urls[:5]:  # Limit to first 5 photos
                if url and 'media-cdn.tripadvisor.com' in url:
                    photos.append(url)
        
        return photos if photos else None
    
    def extract_recent_reviews(self, response):
        """Extract recent reviews sample"""
        review_containers = response.css('div[data-test*="review"], div[class*="review"]')
        
        reviews = []
        for container in review_containers[:3]:  # Get first 3 reviews
            author = container.css('.memberOverlayLink span::text').get()
            rating_element = container.css('span[class*="ui_bubble_rating"]::attr(class)').get()
            review_text = container.css('.partial_entry::text').get()
            date = container.css('.ratingDate::attr(title)').get()
            
            rating = None
            if rating_element:
                rating_match = re.search(r'bubble_(\d+)', rating_element)
                if rating_match:
                    rating = float(rating_match.group(1)) / 10
            
            if author or review_text:
                reviews.append({
                    'author': author.strip() if author else None,
                    'rating': rating,
                    'text': review_text.strip() if review_text else None,
                    'date': date.strip() if date else None
                })
        
        return reviews if reviews else None
    
    def extract_tripadvisor_id(self, url):
        """Extract TripAdvisor restaurant ID from URL"""
        # Extract ID from URL like "/Restaurant_Review-g304026-d23745740-Reviews-..."
        id_match = re.search(r'-d(\d+)-', url)
        return id_match.group(1) if id_match else None
    
    def extract_ranking(self, response):
        """Extract restaurant ranking"""
        ranking_selectors = [
            'div[data-test*="ranking"]::text',
            '.rank::text',
            'span[class*="rank"]::text'
        ]
        
        for selector in ranking_selectors:
            ranking = response.css(selector).get()
            if ranking and '#' in ranking:
                return ranking.strip()
        
        return None