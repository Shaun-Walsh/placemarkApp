# Placemark Svelte Frontend

A modern venue management application built with SvelteKit, featuring interactive maps, image galleries, and real-time data visualization.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/signup with JWT tokens
- **Venue Management** - Add, edit, and delete venues with location data
- **Interactive Maps** - Leaflet integration with custom markers and venue grouping
- **Image Upload** - Cloudinary integration for venue photos
- **Data Visualization** - Charts showing venue statistics by type and payment method
- **Gallery View** - Masonry layout showcasing all venue images

### Technical Features
- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Progressive Enhancement** - Works without JavaScript, enhanced with it
- **Real-time State Management** - Global state with Svelte 5 runes
- **Responsive Design** - Mobile-first Bulma CSS framework
- **Type Safety** - Full TypeScript implementation

## 🛠 Tech Stack

- **Frontend Framework**: SvelteKit 5
- **Language**: TypeScript
- **Styling**: Bulma CSS Framework
- **Maps**: Leaflet.js
- **Charts**: Frappe Charts
- **Gallery**: Flowbite Svelte
- **HTTP Client**: Axios
- **Image Storage**: Cloudinary

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or pnpm
- Backend API running (separate repository)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd placemark-svelte

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Environment Variables
```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3000

# Cloudinary configuration (if needed)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 🏗 Architecture

### State Management
The application uses Svelte 5 runes for reactive state management:

```typescript
// Global state in runes.svelte
export const currentVenues = $state({ venues: [] });
export const loggedInUser = $state({ 
  email: "", 
  token: "", 
  name: "", 
  _id: "" 
});
```

### API Integration
The service layer handles all backend communication:

```typescript
// placemark-service.ts
export const placemarkService = {
  baseUrl: "https://placemark-sl2m.onrender.com",
  
  async getVenues(token: string): Promise<Venue[]> {
    // API calls with proper error handling
  }
};
```

### Form Handling
Uses SvelteKit's enhanced forms for progressive enhancement:

```svelte
<form method="POST" action="?/addVenue" use:enhance={enhanceFn}>
  <!-- Form fields -->
</form>
```

## 🗺 Map Integration

### Leaflet Setup
- Dynamic marker creation based on venue types
- Venue grouping with layer controls
- Custom popup content with venue details
- Responsive map sizing

### Key Features
```javascript
// Add markers programmatically
await map.addMarker(lat, lng, title, venueType);

// Move map to location
await map.moveTo(lat, lng);
```

## 📸 Image Management

### Upload Flow
1. User selects image in `ImageUploadTest.svelte`
2. Image uploads to Cloudinary via backend API
3. URL returned and bound to form
4. Venue saved with image URL

### Gallery Display
- Masonry layout using Flowbite components
- Responsive columns (2 on mobile, 4 on desktop)
- Lazy loading for performance

## 📊 Data Visualization

### Chart Types
- **Pie Charts**: Venues by type
- **Bar Charts**: Payment method distribution
- Real-time updates when data changes

### Implementation
```svelte
<Chart 
  data={currentDataSets.venuesByVenueType} 
  type="pie" 
/>
```

## 🔐 Authentication

### Session Management
- JWT tokens stored in HTTP-only cookies
- Automatic token refresh on page load
- Global auth state management

### Protection
```typescript
// Server-side auth check
export const load: PageServerLoad = async ({ cookies }) => {
  const session = await validateSession(cookies);
  if (!session) {
    throw redirect(302, '/login');
  }
};
```

## 🎨 Styling

### Bulma Framework
- Modern CSS framework with flexbox
- Built-in responsive design
- Consistent component styling

### Custom Styling
```css
/* Global styles in app.css */
.card-image-overlay {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
```

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Environment Considerations
- Update `baseUrl` in placemark-service.ts for production
- Ensure CORS is configured on backend
- Set up proper error logging

## 🧪 Key Components

### LeafletMap.svelte
Interactive map component with venue markers and navigation.

### VenueCards.svelte
Displays venue information with image management capabilities.

### ImageUploadTest.svelte
Handles file upload to Cloudinary with progress feedback.

### AddVenueForm.svelte
Form for creating new venues with location and image data.

## 📝 API Endpoints

The frontend communicates with these backend endpoints:

```typescript
// Authentication
POST /api/users/authenticate
POST /api/users

// Venues
GET /api/venues
POST /api/venueTypes/{id}/venues
PUT /api/venues/{id}

// Images
POST /api/images/upload
DELETE /api/images/{id}
DELETE /api/venues/{id}/image
```

## 🔄 Data Flow

1. **Page Load**: Server loads data, sets global state
2. **User Action**: Form submission or interaction
3. **API Call**: Service layer handles HTTP requests
4. **State Update**: Global state refreshed
5. **UI Update**: Components react to state changes

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: Mobile (default), Tablet (768px+), Desktop (1024px+)
- Adaptive layouts for maps, galleries, and forms

## 🛡 Error Handling

- Axios interceptors for global error handling
- User-friendly error messages
- Graceful degradation when services unavailable

## 🎯 Performance

- Server-side rendering for fast initial loads
- Lazy loading of heavy components (maps, charts)
- Optimized image delivery via Cloudinary
- Efficient state updates with Svelte reactivity

---

**Built with ❤️ using SvelteKit**