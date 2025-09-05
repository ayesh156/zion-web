# Google Maps Embed Integration Guide

## Overview
The property management system now supports direct Google Maps iframe embedding without requiring a Google Maps API key. This feature allows administrators to easily add interactive maps to property listings.

## How to Add a Map to Your Property

### Step 1: Get the Embed Code from Google Maps
1. Go to [Google Maps](https://maps.google.com)
2. Search for your property location
3. Click the **"Share"** button
4. Select **"Embed a map"**
5. Choose your preferred size (recommended: Medium or Large)
6. Copy the provided iframe code

### Step 2: Add to Property Form
1. Navigate to the admin property form
2. Go to the **"Content & Rules"** step
3. Find the **"Google Maps Location"** section
4. Paste your embed code in the text area

### Supported Input Formats

#### 1. Full iframe Code (Recommended)
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798..." 
        width="600" height="450" style="border:0;" allowfullscreen="" 
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

#### 2. Direct Embed URL
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798...
```

#### 3. Regular Google Maps URLs (Auto-converted)
```
https://maps.app.goo.gl/ABC123
https://www.google.com/maps/place/Location+Name/@6.9271,79.8612,17z
```

## Features

### Real-time Validation
- ✅ **Valid embed detected**: Green checkmark appears
- ❌ **Invalid format**: Red error message with suggestions
- 🔄 **Auto-conversion**: Regular Google Maps URLs are automatically converted to embed format

### Live Preview
- See exactly how your map will appear on the property page
- Interactive map preview in the admin form
- Responsive design for all device sizes

### No API Key Required
- Works without Google Maps API key
- Direct iframe embedding
- No usage limits or billing concerns

## Best Practices

### 1. Map Size Selection
- **Small**: Good for contact pages
- **Medium**: Recommended for property listings
- **Large**: Best for detailed location pages

### 2. Location Accuracy
- Zoom in to the exact building/property location
- Use the most specific address possible
- Verify the pin is correctly placed

### 3. Privacy Considerations
- Iframe embeds are public and don't require authentication
- Consider using approximate locations for private properties
- Review Google's terms of service for commercial use

## Troubleshooting

### Common Issues

#### "Invalid iframe code" Error
- **Cause**: Pasted content is not from Google Maps
- **Solution**: Ensure you're copying from Google Maps' "Embed a map" option

#### "Could not convert URL" Error
- **Cause**: URL format not recognized
- **Solution**: Use the direct iframe embed method instead

#### Map Not Displaying
- **Cause**: Invalid or malformed embed URL
- **Solution**: Generate a new embed code from Google Maps

### Testing Your Map
1. Add the embed code in the admin form
2. Check the live preview
3. Save the property
4. View the property page to confirm display
5. Test on mobile devices for responsiveness

## Security Notes

- All iframe embeds are sanitized and validated
- Only Google Maps domains are accepted
- No JavaScript execution from embed codes
- Safe for public-facing websites

## Support

For technical issues or questions about the map integration feature, please refer to the development team or check the application logs for detailed error messages.

---

**Last Updated**: September 2, 2025  
**Version**: 1.0  
**Feature**: Direct Google Maps Iframe Embedding
