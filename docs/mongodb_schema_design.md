# MongoDB Data Models & Schema Design
## Lagos Restaurant Directory

### Overview

This document outlines the MongoDB collections, document structures, indexing strategies, and relationships for the Lagos Restaurant Directory platform. The schema is designed for flexibility, performance, and scalability while supporting geospatial queries and complex search operations.

## Database Architecture

### Collections Structure
```
lagos_restaurant_directory/
├── restaurants
├── users
├── reviews
├── categories
├── neighborhoods
├── restaurant_claims
├── analytics_events
├── admin_logs
└── content_moderation
```

## Collection Schemas

### 1. Restaurants Collection

```javascript
{
  _id: ObjectId,
  
  // Basic Information
  name: String, // Required, indexed
  slug: String, // URL-friendly name, unique, indexed
  description: String,
  phone: [String], // Array to support multiple numbers
  email: String,
  website: String,
  
  // Location Data
  location: {
    address: {
      street: String,
      area: String, // e.g., "Victoria Island"
      city: "Lagos",
      state: "Lagos State", 
      country: "Nigeria",
      postal_code: String
    },
    coordinates: {
      type: "Point", // GeoJSON format for MongoDB geospatial queries
      coordinates: [Number, Number] // [longitude, latitude]
    },
    landmark: String, // "Near Tafawa Balewa Square"
    directions: String
  },
  
  // Business Details
  categories: [ObjectId], // References to categories collection
  cuisine_types: [String], // ["Nigerian", "Continental", "Chinese"]
  price_range: {
    min: Number, // Minimum price in Naira
    max: Number, // Maximum price in Naira  
    symbol: String // "₦" or "$"
  },
  
  // Operating Hours
  hours: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean }
  },
  
  // Menu Information
  menu: {
    has_physical_menu: Boolean,
    menu_pdf_url: String, // PDF menu upload
    structured_menu: [
      {
        category: String, // "Appetizers", "Main Course"
        items: [
          {
            name: String,
            description: String,
            price: Number,
            currency: String,
            dietary_tags: [String], // ["vegetarian", "halal", "gluten-free"]
            image_url: String,
            available: Boolean
          }
        ]
      }
    ],
    last_updated: Date
  },
  
  // Media
  images: [
    {
      url: String,
      caption: String,
      type: String, // "interior", "food", "exterior", "menu"
      uploaded_by: ObjectId, // User who uploaded
      upload_date: Date,
      is_primary: Boolean
    }
  ],
  
  // Features & Amenities
  features: {
    parking: Boolean,
    wifi: Boolean,
    outdoor_seating: Boolean,
    air_conditioning: Boolean,
    live_music: Boolean,
    delivery: Boolean,
    takeaway: Boolean,
    reservations: Boolean,
    wheelchair_accessible: Boolean,
    kids_friendly: Boolean,
    pet_friendly: Boolean,
    alcohol_served: Boolean,
    halal: Boolean,
    vegetarian_options: Boolean,
    private_dining: Boolean
  },
  
  // Rating & Reviews Summary
  rating_summary: {
    average_rating: Number, // 0-5
    total_reviews: Number,
    rating_distribution: {
      "5": Number,
      "4": Number, 
      "3": Number,
      "2": Number,
      "1": Number
    }
  },
  
  // Business Account Info
  business_info: {
    owner_id: ObjectId, // Reference to user who claimed the restaurant
    claimed: Boolean,
    claim_date: Date,
    subscription_tier: String, // "free", "premium", "featured"
    subscription_expires: Date,
    verification_status: String // "pending", "verified", "rejected"
  },
  
  // SEO & Discovery
  tags: [String], // Custom tags for better discovery
  featured: Boolean,
  trending: Boolean,
  
  // System Fields
  status: String, // "active", "pending", "inactive", "blocked"
  created_at: Date,
  updated_at: Date,
  created_by: ObjectId, // Admin or system
  last_verified: Date,
  
  // Analytics
  view_count: Number,
  contact_clicks: Number,
  direction_requests: Number
}
```

### 2. Users Collection

```javascript
{
  _id: ObjectId,
  
  // Authentication
  email: String, // Required, unique, indexed
  phone: String, // Nigerian phone format
  password_hash: String,
  auth_provider: String, // "local", "google", "facebook"
  provider_id: String,
  
  // Profile Information  
  profile: {
    first_name: String,
    last_name: String,
    display_name: String,
    avatar_url: String,
    bio: String,
    date_of_birth: Date,
    gender: String
  },
  
  // Location Preferences
  location: {
    current_area: String, // "Lekki", "Victoria Island"
    coordinates: {
      type: "Point",
      coordinates: [Number, Number]
    },
    location_sharing: Boolean
  },
  
  // Preferences
  preferences: {
    cuisine_types: [String],
    price_range: { min: Number, max: Number },
    dietary_restrictions: [String], // ["vegetarian", "halal", "gluten-free"]
    favorite_features: [String], // ["parking", "wifi", "outdoor_seating"]
    notification_settings: {
      email_reviews: Boolean,
      sms_promotions: Boolean,
      push_notifications: Boolean
    }
  },
  
  // Social Features
  social: {
    followers_count: Number,
    following_count: Number,
    reviews_count: Number,
    photos_count: Number,
    check_ins_count: Number
  },
  
  // Favorites & Lists
  favorites: [ObjectId], // Restaurant IDs
  custom_lists: [
    {
      name: String, // "Date Night Spots", "Business Lunch"
      restaurants: [ObjectId],
      created_at: Date,
      public: Boolean
    }
  ],
  
  // Account Status
  account_type: String, // "user", "business_owner", "blogger", "admin"
  status: String, // "active", "suspended", "deleted"
  email_verified: Boolean,
  phone_verified: Boolean,
  
  // Trust & Safety
  trust_score: Number, // Algorithm-based user reliability score
  reported_count: Number,
  
  // System Fields
  created_at: Date,
  updated_at: Date,
  last_login: Date,
  login_count: Number
}
```

### 3. Reviews Collection

```javascript
{
  _id: ObjectId,
  
  // Core Review Data
  user_id: ObjectId, // Reference to users collection
  restaurant_id: ObjectId, // Reference to restaurants collection
  rating: Number, // 1-5 stars, required
  title: String,
  review_text: String,
  
  // Experience Details
  visit_date: Date,
  party_size: Number,
  occasion: String, // "date_night", "business", "family", "casual"
  
  // Media
  images: [
    {
      url: String,
      caption: String,
      upload_date: Date
    }
  ],
  
  // Detailed Ratings (Optional)
  detailed_ratings: {
    food_quality: Number, // 1-5
    service: Number,      // 1-5
    ambiance: Number,     // 1-5
    value_for_money: Number // 1-5
  },
  
  // Social Engagement
  helpful_votes: {
    positive: [ObjectId], // User IDs who found review helpful
    negative: [ObjectId]  // User IDs who found review unhelpful
  },
  helpful_score: Number, // Calculated score
  
  // Restaurant Response
  restaurant_response: {
    response_text: String,
    response_date: Date,
    responder_name: String
  },
  
  // Moderation
  moderation: {
    status: String, // "published", "pending", "flagged", "removed"
    flags: [
      {
        reason: String, // "fake", "inappropriate", "spam"
        reported_by: ObjectId,
        report_date: Date
      }
    ],
    reviewed_by: ObjectId, // Admin who reviewed
    reviewed_date: Date
  },
  
  // System Fields
  status: String, // "active", "deleted", "hidden"
  created_at: Date,
  updated_at: Date,
  
  // Analytics
  view_count: Number,
  share_count: Number
}
```

### 4. Categories Collection

```javascript
{
  _id: ObjectId,
  name: String, // "Nigerian", "Fast Food", "Fine Dining"
  slug: String, // "nigerian", "fast-food", "fine-dining"
  description: String,
  icon_url: String,
  color: String, // Hex color for UI
  parent_category: ObjectId, // For hierarchical categories
  subcategories: [ObjectId],
  restaurant_count: Number, // Denormalized count
  featured: Boolean,
  sort_order: Number,
  created_at: Date,
  updated_at: Date
}
```

### 5. Neighborhoods Collection

```javascript
{
  _id: ObjectId,
  name: String, // "Victoria Island", "Lekki Phase 1"
  slug: String,
  description: String,
  boundaries: {
    type: "Polygon", // GeoJSON polygon
    coordinates: [[[Number, Number]]] // Polygon coordinates
  },
  center_point: {
    type: "Point",
    coordinates: [Number, Number]
  },
  restaurant_count: Number,
  popular_cuisines: [String],
  average_price_range: { min: Number, max: Number },
  featured_image: String,
  created_at: Date,
  updated_at: Date
}
```

### 6. Restaurant Claims Collection

```javascript
{
  _id: ObjectId,
  restaurant_id: ObjectId,
  claimant_user_id: ObjectId,
  
  // Verification Details
  business_documents: [
    {
      type: String, // "business_registration", "id_card", "utility_bill"
      url: String,
      upload_date: Date
    }
  ],
  
  verification_details: {
    business_name: String,
    business_registration_number: String,
    contact_person: String,
    position: String,
    verification_phone: String
  },
  
  // Status
  status: String, // "pending", "approved", "rejected", "needs_documents"
  admin_notes: String,
  processed_by: ObjectId, // Admin user ID
  processed_date: Date,
  
  created_at: Date,
  updated_at: Date
}
```

## Indexing Strategy

### Primary Indexes

```javascript
// Restaurants Collection
db.restaurants.createIndex({ "location.coordinates": "2dsphere" }) // Geospatial
db.restaurants.createIndex({ name: "text", description: "text", "cuisine_types": "text" }) // Full-text search
db.restaurants.createIndex({ slug: 1 }, { unique: true })
db.restaurants.createIndex({ status: 1, featured: -1, "rating_summary.average_rating": -1 })
db.restaurants.createIndex({ categories: 1 })
db.restaurants.createIndex({ "business_info.subscription_tier": 1 })

// Users Collection  
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 })
db.users.createIndex({ "location.coordinates": "2dsphere" })

// Reviews Collection
db.reviews.createIndex({ restaurant_id: 1, created_at: -1 })
db.reviews.createIndex({ user_id: 1, created_at: -1 })
db.reviews.createIndex({ rating: 1, created_at: -1 })
db.reviews.createIndex({ "moderation.status": 1 })

// Categories Collection
db.categories.createIndex({ slug: 1 }, { unique: true })
db.categories.createIndex({ parent_category: 1 })
```

### Compound Indexes

```javascript
// Restaurant search with location and filters
db.restaurants.createIndex({ 
  "location.coordinates": "2dsphere", 
  categories: 1, 
  "rating_summary.average_rating": -1 
})

// User's restaurant interactions
db.reviews.createIndex({ 
  user_id: 1, 
  restaurant_id: 1, 
  created_at: -1 
})

// Restaurant discovery
db.restaurants.createIndex({
  status: 1,
  featured: -1,
  "rating_summary.average_rating": -1,
  created_at: -1
})
```

## Data Relationships & Aggregation Pipelines

### Common Aggregation Queries

#### 1. Restaurant Details with Reviews Summary

```javascript
db.restaurants.aggregate([
  { $match: { slug: "restaurant-slug" } },
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "restaurant_id",
      as: "recent_reviews",
      pipeline: [
        { $match: { "moderation.status": "published" } },
        { $sort: { created_at: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "users",
            localField: "user_id", 
            foreignField: "_id",
            as: "reviewer",
            pipeline: [{ $project: { "profile.display_name": 1, "profile.avatar_url": 1 } }]
          }
        }
      ]
    }
  },
  {
    $lookup: {
      from: "categories",
      localField: "categories",
      foreignField: "_id", 
      as: "category_details"
    }
  }
])
```

#### 2. Nearby Restaurants Query

```javascript
db.restaurants.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [longitude, latitude] },
      distanceField: "distance",
      maxDistance: 5000, // 5km radius
      spherical: true,
      query: { 
        status: "active",
        categories: { $in: [category_ids] }
      }
    }
  },
  {
    $lookup: {
      from: "categories",
      localField: "categories",
      foreignField: "_id",
      as: "category_details"
    }
  },
  { $sort: { featured: -1, "rating_summary.average_rating": -1 } },
  { $limit: 20 }
])
```

#### 3. User's Personalized Recommendations

```javascript
db.restaurants.aggregate([
  {
    $match: {
      status: "active",
      cuisine_types: { $in: user.preferences.cuisine_types },
      "price_range.max": { $lte: user.preferences.price_range.max }
    }
  },
  {
    $addFields: {
      recommendation_score: {
        $add: [
          { $multiply: ["$rating_summary.average_rating", 2] },
          { $cond: [{ $eq: ["$featured", true] }, 1, 0] },
          { $cond: [{ $gte: ["$rating_summary.total_reviews", 10] }, 1, 0] }
        ]
      }
    }
  },
  { $sort: { recommendation_score: -1 } },
  { $limit: 10 }
])
```

## Data Validation & Schema Enforcement

### Mongoose Schema Validation (if using Node.js)

```javascript
// Restaurant Schema Validation
const restaurantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 100 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  location: {
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: function(coords) {
            return coords.length === 2 && 
                   coords[0] >= -180 && coords[0] <= 180 && // longitude
                   coords[1] >= -90 && coords[1] <= 90;     // latitude
          },
          message: 'Invalid coordinates format'
        }
      }
    }
  },
  rating_summary: {
    average_rating: { 
      type: Number, 
      min: 0, 
      max: 5, 
      default: 0 
    },
    total_reviews: { 
      type: Number, 
      min: 0, 
      default: 0 
    }
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Create geospatial index
restaurantSchema.index({ "location.coordinates": "2dsphere" });
```

## Performance Optimization Strategies

### 1. Read Optimization
- **Denormalization:** Store frequently accessed data (rating summaries, review counts) directly in restaurant documents
- **Projection:** Only fetch required fields in queries
- **Pagination:** Use cursor-based pagination for large result sets

### 2. Write Optimization  
- **Batch Operations:** Group related writes together
- **Background Jobs:** Update non-critical data (analytics, counters) asynchronously
- **Upsert Operations:** Use upsert for rating calculations and counters

### 3. Caching Strategy
- **Redis:** Cache frequently accessed restaurant data, search results
- **Application-level:** Cache processed aggregation results
- **CDN:** Cache static assets (images, menus)

## Scaling Considerations

### 1. Sharding Strategy
```javascript
// Shard restaurants by location (Lagos areas)
sh.shardCollection("lagos_restaurant_directory.restaurants", {
  "location.address.area": "hashed"
})

// Shard reviews by restaurant_id to keep restaurant reviews together
sh.shardCollection("lagos_restaurant_directory.reviews", {
  "restaurant_id": "hashed"
})
```

### 2. Read Replicas
- Configure read replicas for analytics and reporting queries
- Use read preference for non-critical read operations

### 3. Data Archiving
- Archive old analytics events after 12 months
- Move inactive restaurants to archive collection
- Implement soft delete for reviews

## Security & Data Privacy

### 1. Data Encryption
- Enable MongoDB encryption at rest
- Use TLS for data in transit
- Hash sensitive user data (passwords, phone numbers)

### 2. Access Control
```javascript
// Create database users with specific roles
db.createUser({
  user: "app_user",
  pwd: "secure_password", 
  roles: [
    { role: "readWrite", db: "lagos_restaurant_directory" }
  ]
})

db.createUser({
  user: "analytics_user",
  pwd: "analytics_password",
  roles: [
    { role: "read", db: "lagos_restaurant_directory" }
  ]
})
```

### 3. Data Retention Policy
- User data: Retain for account lifetime + 90 days after deletion
- Analytics data: Aggregate and anonymize after 12 months  
- Review data: Keep indefinitely but allow user deletion requests

## Migration & Deployment

### 1. Development to Production Migration
```javascript
// Export from development
mongodump --db=lagos_restaurant_directory_dev --out=./backup

// Import to production  
mongorestore --db=lagos_restaurant_directory_prod ./backup/lagos_restaurant_directory_dev
```

### 2. Schema Evolution
- Use MongoDB's flexible schema for backward compatibility
- Implement migration scripts for breaking changes
- Version your schema changes

### 3. Backup Strategy
- Automated daily backups using MongoDB Atlas or mongodump
- Point-in-time recovery capability
- Test restore procedures monthly

## Monitoring & Analytics

### 1. Performance Monitoring
- Monitor slow queries (>100ms)
- Track index usage and effectiveness  
- Set up alerts for connection pool exhaustion

### 2. Business Metrics
- Track restaurant addition rate
- Monitor review submission patterns
- Measure search query performance

### 3. Data Quality
- Monitor for duplicate restaurants
- Check data completeness (missing coordinates, phone numbers)
- Validate user review patterns for authenticity

This schema design provides a solid foundation for your Lagos Restaurant Directory, with room for growth and optimization as your platform scales.