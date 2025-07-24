import scrapy
import random

# Toggle proxy usage - set to False to run without proxies
USE_PROXIES = False


class TripadvisorLagosSpider(scrapy.Spider):
    name = "tripadvisor_lagos"
    allowed_domains = ["tripadvisor.com"]
    start_urls = [
        "https://www.tripadvisor.com/Restaurants-g304026-Lagos_Lagos_State.html"
    ]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add proxy settings if enabled
        if USE_PROXIES:
            self.custom_settings['DOWNLOADER_MIDDLEWARES'].update({
                'rotating_proxies.middlewares.RotatingProxyMiddleware': 610,
                'rotating_proxies.middlewares.BanDetectionMiddleware': 620,
            })
            self.custom_settings['ROTATING_PROXY_LIST_PATH'] = 'proxy_list.txt'
    
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
    
    
    custom_settings = {
        'DOWNLOAD_DELAY': 3,
        'RANDOMIZE_DOWNLOAD_DELAY': True,
        'ROBOTSTXT_OBEY': False,
        'DEFAULT_REQUEST_HEADERS': {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
        },
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,
            'scrapy_user_agents.middlewares.RandomUserAgentMiddleware': 400,
        }
    }
    
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url=url,
                headers={'User-Agent': random.choice(self.user_agents)},
                callback=self.parse,
                dont_filter=True
            )

    def parse(self, response):
        # Look for restaurant links directly - more reliable approach
        restaurant_links = response.css("a[href*='Restaurant_Review']")
        print(f"Found {len(restaurant_links)} restaurant links")
        
        # Track processed restaurants to avoid duplicates
        processed_urls = set()
        
        for link in restaurant_links:
            href = link.css("::attr(href)").get()
            if not href or href in processed_urls:
                continue
                
            processed_urls.add(href)
            
            # Extract restaurant name from link text or nearby elements
            name = None
            
            # Try different ways to get the restaurant name
            name_candidates = [
                link.css("::text").get(),
                link.css("span::text").get(),
                link.css("div::text").get(),
                # Look for text in parent elements
                link.xpath("./ancestor::*[1]//text()[normalize-space()]").get(),
                link.xpath("./following-sibling::*//text()[normalize-space()]").get(),
            ]
            
            for candidate in name_candidates:
                if candidate and candidate.strip() and len(candidate.strip()) > 3:
                    # Skip generic text
                    if candidate.strip().lower() not in ['restaurant', 'establishment type', 'meal type', 'cuisines', 'dishes', 'price', 'traveler rating', 'open now', 'dietary restrictions', 'great for', 'features']:
                        name = candidate.strip()
                        break
            
            # Extract restaurant name from URL if name not found
            if not name and href:
                import re
                url_match = re.search(r'Reviews-([^-]+)', href)
                if url_match:
                    name = url_match.group(1).replace('_', ' ')
            
            # Look for rating and reviews in the link's container
            container = link.xpath("./ancestor::*[contains(@class, 'listing') or contains(@class, 'card') or contains(@class, 'restaurant')][1]").get()
            rating = None
            reviews = None
            
            if container:
                # Try to find rating and review count in the container
                rating_elem = link.xpath("./ancestor::*[1]//span[contains(@class, 'rating')]//text()").get()
                reviews_elem = link.xpath("./ancestor::*[1]//*[contains(text(), 'review')]//text()").get()
                
                if rating_elem:
                    rating = rating_elem.strip()
                if reviews_elem:
                    reviews = reviews_elem.strip()
            
            if name or href:
                yield {
                    "name": name,
                    "rating": rating,
                    "reviews": reviews,
                    "link": response.urljoin(href) if href else None,
                }

        # Go to next page if exists
        next_page = response.css("a.nav.next.rndBtn.ui_button.primary.taLnk::attr(href)").get()
        if next_page:
            yield scrapy.Request(
                url=response.urljoin(next_page),
                headers={'User-Agent': random.choice(self.user_agents)},
                callback=self.parse,
                dont_filter=True
            )
