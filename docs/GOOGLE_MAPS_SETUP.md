# Google Maps Integration Setup

## Overview
The Zion Property Care website uses Google Maps to display property locations with interactive maps.

## Environment Variables
Add your Google Maps API key to the `.env` file:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

## Getting Your Google Maps API Key

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select existing one
4. Name it (e.g., "Zion Property Care Maps")

### 2. Enable Required APIs
Enable these APIs in "APIs & Services" > "Library":
- **Maps Embed API** (required for iframe embeds)
- Maps JavaScript API (optional, for future features)

### 3. Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### 4. Secure Your API Key (Important!)
1. Click on your API key to edit it
2. Under "Application restrictions":
   - Choose "HTTP referrers (web sites)"
   - Add your domains:
     - `localhost:3000/*` (development)
     - `localhost:3001/*` (development)
     - `yourdomain.com/*` (production)
     - `*.yourdomain.com/*` (subdomains)

3. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Maps Embed API"

### 5. Set Up Billing
Google Maps requires a billing account, but provides $200/month free credits.

## Implementation Details

### URL Formats Supported
- `maps.app.goo.gl/xxxxx` (Google short links)
- `google.com/maps/place/...` (Place URLs)
- `google.com/maps/@lat,lng` (Coordinate URLs)
- Address fallback for any location

### API Integration
The `LocationDisplay` component automatically:
- Uses official Google Maps Embed API when API key is available
- Falls back to basic embed mode without API key
- Displays helpful warnings when API key is missing
- Provides "Open in Maps" button as backup

### Error Handling
- Shows loading states while maps load
- Displays fallback content if maps fail to load
- Provides clear error messages about missing API keys
- Always includes direct link to Google Maps

## Testing
1. Add your API key to `.env`
2. Restart the development server
3. Visit any property page with a location
4. Verify the map displays without errors in browser console

## Troubleshooting

### Map shows error or doesn't load
- Check if API key is correctly set in `.env`
- Verify Maps Embed API is enabled in Google Cloud Console
- Check browser console for specific error messages
- Ensure domain is allowed in API key restrictions

### "This page can't load Google Maps correctly"
- Usually indicates API key issues
- Check API key restrictions and billing setup
- Verify the correct APIs are enabled

## Cost Considerations
- Google provides $200/month free credits
- Typical usage for property websites stays within free tier
- Monitor usage in Google Cloud Console
