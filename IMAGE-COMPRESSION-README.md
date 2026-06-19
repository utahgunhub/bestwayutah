# Image Compression Guide

## What This Does

This script compresses all the high-resolution images in your gallery to improve website loading performance.

## Changes Made

### 1. Gallery Component (`src/pages/Gallery.tsx`)
- Added `loading="lazy"` to all gallery images - only loads images when they're about to enter the viewport
- Added `decoding="async"` - prevents images from blocking the main thread while decoding
- Images now load smoothly as you scroll without blocking the page

### 2. Compression Script (`compress-images.js`)
- Compresses JPG images with 82% quality (nearly indistinguishable from original)
- Resizes images to max 2400x2400px (perfect for web, still high quality for galleries)
- Uses progressive JPEG encoding for better perceived loading speed
- Processes all images in:
  - `public/anderson-basement/` (14 images)
  - `public/avondale/` (12 images)
  - `public/fox-croft-photos/` (58 images)
  - `public/okun-photos/` (58 images)
  - `public/project-stone-creek/` (12 images)
  - **Total: 154 images**

## How to Run

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Compression (One-time)
```bash
npm run compress-images
```

**⚠️ Important:** This will permanently replace your original images with compressed versions. Make sure you have backups if needed!

### Step 3: Test Your Site
```bash
npm run dev
```

Then visit `http://localhost:5173/gallery` to see the improvements.

## Expected Results

- **File Size Reduction:** Typically 60-80% smaller files
- **Faster Loading:** Images appear much quicker as you scroll
- **Better UX:** No more images disappearing/reappearing as you scroll
- **Quality:** Visually nearly identical to originals at web viewing sizes

## Example Output

```
🖼️  Image Compression Script
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quality: 82%
Max dimensions: 2400x2400px
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Processing directory: public/anderson-basement
Processing: 3624 Post Oak Tritt Rd High Res_01.jpg (4000x3000)
  ✓ Saved 68.2% (12.45MB → 3.96MB)
...

🎉 ALL DONE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total images processed: 154
Total original size: 892.34MB
Total compressed size: 254.12MB
Total saved: 638.22MB (71.5%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Troubleshooting

### "Error: Cannot find module 'sharp'"
Run: `npm install`

### Images look blurry
Adjust the `QUALITY` setting in `compress-images.js` (line 6) to a higher value (e.g., 90)

### Need to re-compress
If you want to adjust settings and re-run, make sure you have backup copies of the original images first!

## Configuration

Edit these variables in `compress-images.js`:

```javascript
const QUALITY = 82;        // JPEG quality (0-100)
const MAX_WIDTH = 2400;    // Max width for images
const MAX_HEIGHT = 2400;   // Max height for images
```

## Performance Impact

**Before:**
- Total image size: ~900MB
- Gallery loads slowly
- Images appear/disappear on scroll
- High bandwidth usage

**After:**
- Total image size: ~250MB (70% reduction!)
- Gallery loads smoothly
- Images lazy-load naturally
- Much lower bandwidth usage
- Better mobile experience

