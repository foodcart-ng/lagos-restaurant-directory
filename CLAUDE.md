# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Scrapy web scraping project designed to collect restaurant data from TripAdvisor for Lagos, Nigeria. The project follows standard Scrapy architecture patterns.

## Commands

### Running the Spider
```bash
scrapy crawl tripadvisor_lagos
```

### Run with Output to File
```bash
scrapy crawl tripadvisor_lagos -o restaurants.json
scrapy crawl tripadvisor_lagos -o restaurants.csv
```

### Development and Testing
```bash
# Test spider on a single page
scrapy shell "https://www.tripadvisor.com/Restaurants-g304026-Lagos_Lagos_State.html"

# Check project configuration
scrapy check

# List available spiders
scrapy list
```

## Code Architecture

### Project Structure
- `lagos_restaurants/` - Main Scrapy project module
  - `spiders/` - Spider implementations (currently empty, spider is in root spiders/)
  - `items.py` - Data models (currently unused, spider yields raw dicts)
  - `pipelines.py` - Data processing pipelines (basic template)
  - `middlewares.py` - Request/response middleware
  - `settings.py` - Project configuration
- `spiders/tripadvisor_lagos.py` - Main spider implementation
- `scrapy.cfg` - Scrapy project configuration

### Spider Implementation (`spiders/tripadvisor_lagos.py`)
- **Target**: TripAdvisor Lagos restaurants page
- **Data Extracted**: Restaurant name, rating, review count, and link
- **Pagination**: Follows "next" page links automatically
- **Selectors**: Uses CSS selectors to extract data from `div.YHnoF` containers

### Configuration Notes
- Configured for respectful crawling (1 second delay, 1 concurrent request per domain)
- Respects robots.txt
- UTF-8 encoding for exports
- Rate limiting configured to avoid being blocked

### Data Output
The spider currently yields dictionaries with:
- `name`: Restaurant name
- `rating`: Star rating
- `reviews`: Number of reviews
- `link`: Full URL to restaurant page

## Development Notes

- The spider is located in `spiders/tripadvisor_lagos.py` rather than in the standard `lagos_restaurants/spiders/` directory
- Items.py defines a `LagosRestaurantsItem` class but it's not currently used - spider yields raw dictionaries
- Pipeline is basic template - no custom data processing implemented
- CSS selectors may need updates if TripAdvisor changes their HTML structure