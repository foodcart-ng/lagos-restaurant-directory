📄 Scraping Plan: Lagos Restaurant Directory
🎯 Goal
Collect and maintain a directory of restaurants in Lagos with:

Name

Address

Phone number

Cuisine type

Opening hours

Ratings & reviews

Social media handles (if possible)

Menus & prices (optional)

🪜 Step-by-step Plan
1️⃣ Data Sources
Source	Method	Notes
Google Places API	API	Primary source for verified business info
TripAdvisor	Web Scraping	Reviews & cuisine categories
Jumia Food	Web Scraping	Menus & delivery data
EatDrinkLagos Blog	Web Scraping	Curated local picks
Instagram / Facebook	API + scraping	Social presence & photos

2️⃣ Data Pipeline
Step	Action
🔎 Discover	Query APIs/scrape sites for type=restaurant within Lagos bounds
📝 Extract	Save name, address, phone, etc., into a raw format
🧹 Clean	Normalize addresses, deduplicate, resolve conflicting data
🗃 Store	Save into a database (PostgreSQL, MongoDB, or Firestore)
🔄 Refresh	Schedule re-scraping weekly/monthly to update info

🖼 Architecture Diagram
          +--------------------+
          |   Data Sources     |
          | (Google, Jumia,    |
          | TripAdvisor, IG)   |
          +--------------------+
                    |
             [ API Calls / Scraping ]
                    |
            +----------------------+
            |   Scraping Workers   |
            | (Scrapy, Puppeteer)  |
            +----------------------+
                    |
             [ Raw Data Storage ]
                    |
            +----------------------+
            |   Cleaning & ETL     |
            | (Pandas, Airflow)    |
            +----------------------+
                    |
            +----------------------+
            |   Database           |
            | (PostgreSQL /        |
            | MongoDB / Firestore) |
            +----------------------+
                    |
            +----------------------+
            |   Web/App Frontend   |
            | (Next.js / Flutter) |
            +----------------------+
