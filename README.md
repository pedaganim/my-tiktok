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

### Local Development

1. Clone the repository
2. Open `index.html` in a web browser or serve via HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Navigate to `http://localhost:8000`

For detailed setup and S3 integration instructions, see [APP_README.md](APP_README.md).

### AWS Deployment

To deploy the application to AWS using Terraform and GitHub Actions:

1. See the comprehensive [Deployment Guide](DEPLOYMENT.md)
2. Configure your GitHub secrets
3. Push to the `main` branch for automatic deployment

## 🎯 Roadmap

- [x] **AWS Deployment**: Terraform scripts for AWS infrastructure
- [x] **Configurable S3 Integration**: Environment-based configuration
- [x] **GitHub Actions CI/CD**: Automated deployment pipeline
- [ ] Add comments functionality
- [ ] Add favorite/like feature
- [ ] User authentication
- [ ] Backend API for S3 integration
- [ ] Video controls and autoplay options

