#!/usr/bin/env python3
"""
Restaurant Data CSV Exporter
Converts JSON output from Google Places spiders to CSV format
"""

import json
import csv
import sys
import argparse
from pathlib import Path

class RestaurantCSVExporter:
    def __init__(self):
        # Define CSV columns and their mappings from JSON
        self.csv_columns = [
            # Basic Information
            'name', 'place_id', 'rating', 'user_ratings_total', 'price_level', 'price_range_text',
            'vicinity', 'formatted_address', 'phone_number', 'phone_number_cleaned', 'website',
            'business_status', 'source', 'latitude', 'longitude',
            
            # Location Details
            'area', 'state', 'country', 'postal_code',
            
            # Service Options
            'delivery', 'takeout', 'dine_in', 'curbside_pickup', 'reservable',
            
            # Accessibility
            'wheelchair_accessible_entrance', 'restroom_available',
            
            # Dining Options
            'serves_breakfast', 'serves_lunch', 'serves_dinner', 'serves_brunch',
            'serves_beer', 'serves_wine', 'serves_vegetarian_food',
            
            # Atmosphere & Features
            'outdoor_seating', 'live_music', 'good_for_children', 'good_for_groups',
            'menu_for_children', 'lgbtq_friendly',
            
            # Offerings
            'serves_coffee', 'serves_dessert', 'serves_happy_hour_food',
            'serves_late_night_food', 'serves_cocktails', 'allows_dogs',
            
            # Children Features
            'allows_children', 'high_chairs', 'changing_table', 'kids_menu',
            'good_for_kids', 'playground',
            
            # Planning & Payment
            'accepts_reservations', 'requires_reservations', 'accepts_credit_cards',
            'accepts_debit_cards', 'accepts_cash_only', 'accepts_nfc',
            
            # Reviews Summary
            'reviews_count', 'avg_rating_from_reviews', 'total_reviews_fetched',
            
            # Additional Info
            'is_open_24_7', 'highlights', 'editorial_summary', 'google_maps_url',
            'photo_url', 'types'
        ]
    
    def extract_value(self, restaurant, key):
        """Extract value from restaurant data with nested key support"""
        if key in restaurant:
            value = restaurant[key]
            # Handle lists and convert to comma-separated strings
            if isinstance(value, list):
                return ', '.join(str(v) for v in value if v)
            return value
        
        # Handle nested keys for complex data structures
        nested_mappings = {
            # Location details
            'area': 'location_details.area',
            'state': 'location_details.state', 
            'country': 'location_details.country',
            'postal_code': 'location_details.postal_code',
            
            # Service options
            'delivery': 'service_options.delivery',
            'takeout': 'service_options.takeout',
            'dine_in': 'service_options.dine_in',
            'curbside_pickup': 'service_options.curbside_pickup',
            'reservable': 'service_options.reservable',
            
            # Accessibility
            'wheelchair_accessible_entrance': 'accessibility.wheelchair_accessible_entrance',
            'restroom_available': 'accessibility.restroom',
            
            # Dining options
            'serves_breakfast': 'dining_options.serves_breakfast',
            'serves_lunch': 'dining_options.serves_lunch',
            'serves_dinner': 'dining_options.serves_dinner',
            'serves_brunch': 'dining_options.serves_brunch',
            'serves_beer': 'dining_options.serves_beer',
            'serves_wine': 'dining_options.serves_wine',
            'serves_vegetarian_food': 'dining_options.serves_vegetarian_food',
            
            # Atmosphere features
            'outdoor_seating': 'atmosphere_features.outdoor_seating',
            'live_music': 'atmosphere_features.live_music',
            'good_for_children': 'atmosphere_features.good_for_children',
            'good_for_groups': 'atmosphere_features.good_for_groups',
            'menu_for_children': 'atmosphere_features.menu_for_children',
            'lgbtq_friendly': 'atmosphere_features.lgbtq_friendly',
            
            # Offerings
            'serves_coffee': 'offerings.serves_coffee',
            'serves_dessert': 'offerings.serves_dessert',
            'serves_happy_hour_food': 'offerings.serves_happy_hour_food',
            'serves_late_night_food': 'offerings.serves_late_night_food',
            'serves_cocktails': 'offerings.serves_cocktails',
            'allows_dogs': 'offerings.allows_dogs',
            
            # Children features
            'allows_children': 'children_features.allows_children',
            'high_chairs': 'children_features.high_chairs',
            'changing_table': 'children_features.changing_table',
            'kids_menu': 'children_features.kids_menu',
            'good_for_kids': 'children_features.good_for_kids',
            'playground': 'children_features.playground',
            
            # Planning
            'accepts_reservations': 'planning.accepts_reservations',
            'requires_reservations': 'planning.requires_reservations',
            'accepts_credit_cards': 'planning.accepts_credit_cards',
            'accepts_debit_cards': 'planning.accepts_debit_cards',
            'accepts_cash_only': 'planning.accepts_cash_only',
            'accepts_nfc': 'planning.accepts_nfc',
            
            # Reviews summary
            'avg_rating_from_reviews': 'reviews_summary.avg_rating_from_reviews',
            'total_reviews_fetched': 'reviews_summary.total_reviews_fetched',
        }
        
        if key in nested_mappings:
            nested_key = nested_mappings[key]
            return self.get_nested_value(restaurant, nested_key)
        
        return None
    
    def get_nested_value(self, data, key_path):
        """Get value from nested dictionary using dot notation"""
        keys = key_path.split('.')
        value = data
        
        for key in keys:
            if isinstance(value, dict) and key in value:
                value = value[key]
            else:
                return None
        
        return value
    
    def convert_json_to_csv(self, json_file, csv_file, include_reviews=False):
        """Convert JSON restaurant data to CSV format"""
        try:
            # Load JSON data
            with open(json_file, 'r', encoding='utf-8') as f:
                restaurants = json.load(f)
            
            if not restaurants:
                print(f"No data found in {json_file}")
                return False
            
            print(f"Processing {len(restaurants)} restaurants...")
            
            # Prepare CSV columns
            columns = self.csv_columns.copy()
            
            # Add review columns if requested
            if include_reviews:
                columns.extend([
                    'review_1_author', 'review_1_rating', 'review_1_text',
                    'review_2_author', 'review_2_rating', 'review_2_text',
                    'review_3_author', 'review_3_rating', 'review_3_text',
                    'review_4_author', 'review_4_rating', 'review_4_text',
                    'review_5_author', 'review_5_rating', 'review_5_text'
                ])
            
            # Write CSV file
            with open(csv_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=columns)
                writer.writeheader()
                
                for restaurant in restaurants:
                    row = {}
                    
                    # Extract standard columns
                    for col in self.csv_columns:
                        row[col] = self.extract_value(restaurant, col)
                    
                    # Extract reviews if requested
                    if include_reviews and 'all_reviews' in restaurant:
                        reviews = restaurant['all_reviews'][:5]  # Get up to 5 reviews
                        for i, review in enumerate(reviews, 1):
                            row[f'review_{i}_author'] = review.get('author_name', '')
                            row[f'review_{i}_rating'] = review.get('rating', '')
                            row[f'review_{i}_text'] = review.get('text', '')[:500]  # Limit text length
                    
                    # Clean up None values
                    for key, value in row.items():
                        if value is None:
                            row[key] = ''
                        elif isinstance(value, bool):
                            row[key] = 'Yes' if value else 'No'
                    
                    writer.writerow(row)
            
            print(f"✅ Successfully exported to {csv_file}")
            return True
            
        except FileNotFoundError:
            print(f"❌ Error: JSON file '{json_file}' not found")
            return False
        except json.JSONDecodeError:
            print(f"❌ Error: Invalid JSON format in '{json_file}'")
            return False
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return False
    
    def create_summary_csv(self, json_file, csv_file):
        """Create a summary CSV with key metrics only"""
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                restaurants = json.load(f)
            
            if not restaurants:
                print(f"No data found in {json_file}")
                return False
            
            # Summary columns
            summary_columns = [
                'name', 'rating', 'user_ratings_total', 'price_range_text',
                'area', 'formatted_address', 'phone_number_cleaned', 'website',
                'highlights', 'delivery', 'takeout', 'dine_in', 'reservable',
                'serves_vegetarian_food', 'outdoor_seating', 'good_for_children',
                'google_maps_url'
            ]
            
            with open(csv_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=summary_columns)
                writer.writeheader()
                
                for restaurant in restaurants:
                    row = {}
                    for col in summary_columns:
                        value = self.extract_value(restaurant, col)
                        if value is None:
                            row[col] = ''
                        elif isinstance(value, bool):
                            row[col] = 'Yes' if value else 'No'
                        else:
                            row[col] = value
                    
                    writer.writerow(row)
            
            print(f"✅ Successfully created summary CSV: {csv_file}")
            return True
            
        except Exception as e:
            print(f"❌ Error creating summary: {str(e)}")
            return False

def main():
    parser = argparse.ArgumentParser(description='Export restaurant JSON data to CSV format')
    parser.add_argument('json_file', help='Input JSON file')
    parser.add_argument('--output', '-o', help='Output CSV file (default: same name as JSON with .csv extension)')
    parser.add_argument('--reviews', '-r', action='store_true', help='Include review text in CSV')
    parser.add_argument('--summary', '-s', action='store_true', help='Create summary CSV with key fields only')
    
    args = parser.parse_args()
    
    # Determine output filename
    if args.output:
        csv_file = args.output
    else:
        json_path = Path(args.json_file)
        csv_file = json_path.parent / f"{json_path.stem}.csv"
    
    # Create exporter instance
    exporter = RestaurantCSVExporter()
    
    if args.summary:
        # Create summary CSV
        summary_file = str(csv_file).replace('.csv', '_summary.csv')
        success = exporter.create_summary_csv(args.json_file, summary_file)
    else:
        # Create full CSV
        success = exporter.convert_json_to_csv(args.json_file, csv_file, include_reviews=args.reviews)
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()