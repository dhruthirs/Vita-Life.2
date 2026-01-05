# Custom Background Images Integration Guide

## Overview

The Blood Donation App now supports custom background images for pages. You can easily integrate your own images to personalize the application.

## How to Add Custom Images

### Step 1: Add Images to Public Folder

1. Place your custom images in: `public/images/backgrounds/`
2. If the folder doesn't exist, create it
3. Supported formats: JPG, PNG, WebP (WebP is recommended for better performance)

### Step 2: Update Page Components

Each page component uses a background image. Here's how to customize them:

#### Dashboard (Home Page)

**File:** `src/components/Dashboard.js`

Current code:

```javascript
<div className="relative h-96 rounded-2xl overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4"
    alt="hero"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
```

To use your custom image, replace the URL:

```javascript
<img
  src="/images/backgrounds/your-image-name.jpg"
  alt="hero"
  className="w-full h-full object-cover"
/>
```

#### Register Page

**File:** `src/components/DonorRegistrationForm.js`

The page uses a dark gradient background:

```javascript
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 py-12 px-4">
```

To add a background image with overlay:

```javascript
<div
  className="min-h-screen py-12 px-4 bg-cover bg-center bg-fixed"
  style={{
    backgroundImage: 'url("/images/backgrounds/register-bg.jpg")',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95"></div>
  <div className="w-full max-w-4xl mx-auto relative z-10">
    {/* existing content */}
  </div>
</div>
```

#### Map Page

**File:** `src/components/DonorMap.js`

Add a subtle background to the page wrapper.

#### Search Page

**File:** `src/components/DonorSearchPage.js`

Add a subtle background to the page wrapper.

## Image Recommendations

### Dimensions

- **Hero Images:** 1920x1080 or 1600x900 (landscape)
- **Full Page:** 1920x1080 minimum
- **Format:** WebP for best performance, JPG as fallback

### Content Tips

- Use images related to blood donation, healthcare, or community
- Ensure images don't interfere with text readability
- For backgrounds under content, use images with lower saturation
- Always apply a dark overlay (60-80% opacity) for text visibility

## Hosting Images Locally vs CDN

### Local Files (Recommended for Privacy)

```javascript
<img src="/images/backgrounds/my-image.jpg" alt="background" />
```

- Better privacy control
- No external dependencies
- Faster in offline mode

### External URLs (CDN)

```javascript
<img src="https://example.com/images/my-image.jpg" alt="background" />
```

- No storage limits
- Easy updates
- Professional CDN services available

## CSS Overlay Techniques

### Dark Overlay (High Contrast)

```css
position: absolute;
inset: 0;
background: linear-gradient(
  135deg,
  rgba(15, 23, 42, 0.9),
  rgba(30, 41, 59, 0.8)
);
z-index: 10;
```

### Light Overlay (Subtle)

```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(4px);
```

### Color Tinted Overlay

```css
background: linear-gradient(
  135deg,
  rgba(6, 182, 212, 0.15),
  rgba(59, 130, 246, 0.15)
);
```

## Example: Complete Custom Background Setup

```javascript
// src/components/Dashboard.js
<div className="relative h-96 rounded-2xl overflow-hidden">
  <img
    src="/images/backgrounds/hero-donation.jpg"
    alt="hero background"
    className="w-full h-full object-cover absolute inset-0"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
  <div className="relative h-full flex flex-col justify-center items-center text-center">
    {/* Your hero content */}
  </div>
</div>
```

## Performance Optimization

### Image Optimization Tools

- **TinyPNG:** https://tinypng.com (Compress PNG/JPG)
- **CloudConvert:** https://cloudconvert.com (Convert to WebP)
- **ImageOptim:** https://imageoptim.com (Mac)

### Recommended File Sizes

- Hero images: 150-300 KB
- Background images: 100-200 KB
- Full page: 200-400 KB

### CSS Performance Tips

```css
/* Use background-size: cover for responsive images */
background-size: cover;
background-position: center;

/* Fixed position for parallax effect */
background-attachment: fixed;

/* Use contain for crisp images */
background-size: contain;
background-repeat: no-repeat;
```

## Troubleshooting

### Image Not Showing

1. Check image file exists in `public/images/backgrounds/`
2. Verify file name and extension match exactly
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check browser console for 404 errors (F12 → Console)

### Image Looks Blurry

1. Use higher resolution images (1920x1080 or higher)
2. Ensure `object-fit: cover` is set for thumbnails
3. Convert to WebP format for better compression

### Overlay Too Dark/Light

1. Adjust opacity values (0 = transparent, 1 = solid)
2. Try gradient overlays for more dynamic effect
3. Use `rgba()` for precise color control

### Text Not Readable

1. Increase overlay opacity from 0.8 to 0.95
2. Add text-shadow: `drop-shadow(2px 2px 4px rgba(0,0,0,0.8))`
3. Consider moving text to solid color area

## Next Steps

1. **Choose Images:** Select 2-3 images for different pages
2. **Create Folder:** Make `public/images/backgrounds/` directory
3. **Add Images:** Copy optimized images to the folder
4. **Update Components:** Replace URLs in page components
5. **Test:** Verify images load and look good in all pages
6. **Optimize:** Compress images if needed for performance

## Support

For questions about image integration, refer to:

- React documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Image optimization: https://web.dev/images
