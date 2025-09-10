# My TikTok - Random S3 Media Viewer

A low-cost TikTok-like web application that displays random photos and videos from a private S3 bucket with swipe navigation.

## 🚀 Features

- **Random Media Display**: Shows photos and videos randomly from S3
- **Swipe Navigation**: Swipe up/down to navigate between media items
- **Secure Access**: Uses presigned URLs - no direct S3 bucket exposure
- **Mobile-First Design**: TikTok-like interface optimized for mobile
- **Multi-Format Support**: Handles both images and videos
- **Touch & Keyboard**: Supports both touch gestures and keyboard navigation

## 📖 Quick Start

1. Clone the repository
2. Open `index.html` in a web browser or serve via HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Navigate to `http://localhost:8000`

For detailed setup and S3 integration instructions, see [APP_README.md](APP_README.md).

## 🎯 Roadmap

- [ ] Add comments functionality
- [ ] Add favorite/like feature
- [ ] User authentication
- [ ] Backend API for S3 integration
- [ ] Video controls and autoplay options

