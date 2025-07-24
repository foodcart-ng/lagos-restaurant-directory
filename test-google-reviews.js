
import { scraper } from "google-maps-review-scraper";

async function testGoogleReviews() {
    try {
        // Test with a Lagos restaurant place ID
        let url = "https://www.google.com/maps/place/?q=place_id:ChIJGwOT5YOTOxARhcar-XbVgAY";
        
        console.log("🔍 Testing Google Maps review scraper...");
        console.log("📍 URL:", url);
        
        const reviews = await scraper(url, { 
            // sort_type: "newest", // Options: newest, oldest, rating_high, rating_low
            // search_query: "food", // Search within reviews
            // pages: 2, // Number of pages to scrape
            clean: false // Keep raw data
        });

        console.log("✅ Reviews scraped successfully!");
        console.log("📊 Total reviews found:", reviews.length);
        
        if (reviews.length > 0) {
            console.log("\n📝 Sample review:");
            console.log("Rating:", reviews[0].rating);
            console.log("Author:", reviews[0].reviewer_name);
            console.log("Date:", reviews[0].review_date);
            console.log("Text:", reviews[0].review_text?.substring(0, 200) + "...");
            
            // Show review structure
            console.log("\n🔧 Review data structure:");
            console.log(Object.keys(reviews[0]));
        }
        
        // Save to file for inspection
        const fs = require('fs');
        fs.writeFileSync('google-reviews-sample.json', JSON.stringify(reviews, null, 2));
        console.log("\n💾 Reviews saved to google-reviews-sample.json");
        
    } catch (error) {
        console.error("❌ Error scraping reviews:", error.message);
        console.error("Stack trace:", error.stack);
    }
}

// Test with multiple restaurant place IDs
async function testMultipleRestaurants() {
    const restaurantPlaceIds = [
        "ChIJGwOT5YOTOxARhcar-XbVgAY", // Ofada Heaven
        // "ChIJVUftO7r1OxARUCfrp6T_0jc", // Eric Kayser - Victoria Island
        // "ChIJ6758W3T1OxAR5rVe7hR6g8Q"  // The GoodLife Restaurant by SRS
    ];
    
    for (const placeId of restaurantPlaceIds) {
        console.log(`\n🏪 Testing place ID: ${placeId}`);
        const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
        
        try {
            const reviews = await scraper(url, { 
                clean: false,
                pages: 1 // Limit to 1 page for testing
            });
            
            console.log(`   📊 Found ${reviews.length} reviews`);
            if (reviews.length > 0) {
                console.log(`   ⭐ Latest review: ${reviews[0].rating} stars by ${reviews[0].reviewer_name}`);
            }
            
        } catch (error) {
            console.error(`   ❌ Error: ${error.message}`);
        }
        
        // Add delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

// Run the tests
testGoogleReviews()
    .then(() => {
        console.log("\n🧪 Running multiple restaurant test...");
        return testMultipleRestaurants();
    })
    .then(() => {
        console.log("\n✅ All tests completed!");
    })
    .catch(error => {
        console.error("💥 Test failed:", error);
    });

