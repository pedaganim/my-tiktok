class MediaViewer {
    constructor() {
        this.currentIndex = 0;
        this.mediaItems = [];
        this.isLoading = false;
        
        // DOM elements
        this.mediaContainer = document.getElementById('mediaContainer');
        this.mediaImage = document.getElementById('mediaImage');
        this.mediaVideo = document.getElementById('mediaVideo');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorIndicator = document.getElementById('errorIndicator');
        this.mediaCounter = document.getElementById('mediaCounter');
        this.mediaType = document.getElementById('mediaType');
        
        // Touch/swipe handling
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        
        this.initializeEventListeners();
        this.loadSampleData();
        this.loadCurrentMedia();
    }
    
    initializeEventListeners() {
        // Touch events for swipe detection
        this.mediaContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.mediaContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse events for desktop testing
        this.mediaContainer.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.mediaContainer.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Video ended event
        this.mediaVideo.addEventListener('ended', () => this.nextMedia());
    }
    
    loadSampleData() {
        // Sample data with local files (simulating presigned URLs)
        // In a real implementation, this would come from an API with actual presigned URLs
        this.mediaItems = [
            {
                url: './sample-image-1.svg',
                type: 'image',
                id: 'sample-image-1'
            },
            {
                url: './sample-image-2.svg',
                type: 'image',
                id: 'sample-image-2'
            },
            {
                url: './sample-image-3.svg',
                type: 'image',
                id: 'sample-image-3'
            },
            {
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAjltZGF0AAACmwYF//+X3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0xMCBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAA9liIQL8mKAAQAAALFBmiRsQz//xYMjxpq6UAIMfmNobA8AAi7tBAOA',
                type: 'video',
                id: 'sample-video-placeholder'
            }
        ];
        
        // Shuffle the array to simulate random display
        this.shuffleArray(this.mediaItems);
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    loadCurrentMedia() {
        if (this.isLoading || this.mediaItems.length === 0) return;
        
        this.isLoading = true;
        this.showLoading();
        
        const currentItem = this.mediaItems[this.currentIndex];
        this.updateMediaInfo();
        
        if (currentItem.type === 'image') {
            this.loadImage(currentItem.url);
        } else if (currentItem.type === 'video') {
            this.loadVideo(currentItem.url);
        }
    }
    
    loadImage(url) {
        // Hide video and show image
        this.mediaVideo.classList.add('hidden');
        this.mediaImage.classList.remove('hidden');
        
        const img = new Image();
        img.onload = () => {
            this.mediaImage.src = url;
            this.hideLoading();
            this.isLoading = false;
        };
        img.onerror = () => {
            this.showError();
            this.isLoading = false;
        };
        img.src = url;
    }
    
    loadVideo(url) {
        // Hide image and show video
        this.mediaImage.classList.add('hidden');
        this.mediaVideo.classList.remove('hidden');
        
        this.mediaVideo.src = url;
        this.mediaVideo.load();
        
        this.mediaVideo.addEventListener('loadeddata', () => {
            this.hideLoading();
            this.isLoading = false;
        }, { once: true });
        
        this.mediaVideo.addEventListener('error', () => {
            this.showError();
            this.isLoading = false;
        }, { once: true });
    }
    
    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
        this.errorIndicator.classList.add('hidden');
        this.mediaImage.classList.add('hidden');
        this.mediaVideo.classList.add('hidden');
    }
    
    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
        this.errorIndicator.classList.add('hidden');
    }
    
    showError() {
        this.loadingIndicator.classList.add('hidden');
        this.errorIndicator.classList.remove('hidden');
        this.mediaImage.classList.add('hidden');
        this.mediaVideo.classList.add('hidden');
    }
    
    updateMediaInfo() {
        this.mediaCounter.textContent = `${this.currentIndex + 1} / ${this.mediaItems.length}`;
        this.mediaType.textContent = this.mediaItems[this.currentIndex].type.toUpperCase();
    }
    
    nextMedia() {
        if (this.isLoading) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.mediaItems.length;
        this.loadCurrentMedia();
        this.addSwipeAnimation('down');
    }
    
    previousMedia() {
        if (this.isLoading) return;
        
        this.currentIndex = this.currentIndex === 0 ? this.mediaItems.length - 1 : this.currentIndex - 1;
        this.loadCurrentMedia();
        this.addSwipeAnimation('up');
    }
    
    addSwipeAnimation(direction) {
        const className = direction === 'up' ? 'swiping-up' : 'swiping-down';
        this.mediaContainer.classList.add(className);
        setTimeout(() => {
            this.mediaContainer.classList.remove(className);
        }, 300);
    }
    
    // Touch event handlers
    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }
    
    handleTouchEnd(e) {
        this.touchEndY = e.changedTouches[0].clientY;
        this.handleSwipe();
    }
    
    // Mouse event handlers for desktop testing
    handleMouseDown(e) {
        this.touchStartY = e.clientY;
    }
    
    handleMouseUp(e) {
        this.touchEndY = e.clientY;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(swipeDistance) < this.minSwipeDistance) {
            return; // Not a significant swipe
        }
        
        if (swipeDistance > 0) {
            // Swipe up - next media
            this.nextMedia();
        } else {
            // Swipe down - previous media
            this.previousMedia();
        }
    }
    
    // Keyboard navigation
    handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.previousMedia();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.nextMedia();
                break;
            case ' ':
                e.preventDefault();
                if (this.mediaItems[this.currentIndex].type === 'video') {
                    if (this.mediaVideo.paused) {
                        this.mediaVideo.play();
                    } else {
                        this.mediaVideo.pause();
                    }
                }
                break;
        }
    }
    
    retryCurrentMedia() {
        this.loadCurrentMedia();
    }
}

// Global functions for button clicks
function nextMedia() {
    if (window.mediaViewer) {
        window.mediaViewer.nextMedia();
    }
}

function previousMedia() {
    if (window.mediaViewer) {
        window.mediaViewer.previousMedia();
    }
}

function retryCurrentMedia() {
    if (window.mediaViewer) {
        window.mediaViewer.retryCurrentMedia();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mediaViewer = new MediaViewer();
});

// Configuration object for the application
const APP_CONFIG = {
    apiEndpoint: window.APP_API_ENDPOINT || '/api/random-media',
    mediaBucketDomain: window.APP_MEDIA_DOMAIN || 'your-media-bucket.s3.amazonaws.com',
    environment: window.APP_ENVIRONMENT || 'development'
};

// API functions for future integration with presigned URLs
class S3MediaAPI {
    static async getPresignedUrls() {
        // This would be implemented to call your backend API
        // that generates presigned URLs for S3 objects
        // For now, returning sample data
        return [
            {
                url: 'https://your-presigned-url-1',
                type: 'image',
                id: 'photo-1'
            },
            {
                url: 'https://your-presigned-url-2',
                type: 'video',
                id: 'video-1'
            }
        ];
    }
    
    static async getRandomMedia(count = 10) {
        // This would fetch random media items from your backend
        // which would generate presigned URLs for random S3 objects
        try {
            const response = await fetch(APP_CONFIG.apiEndpoint);
            if (response.ok) {
                return await response.json();
            } else {
                console.warn('API endpoint not available, using sample data');
                return await this.getPresignedUrls();
            }
        } catch (error) {
            console.error('Failed to fetch media:', error);
            // Fallback to sample data in development
            if (APP_CONFIG.environment === 'development') {
                return await this.getPresignedUrls();
            }
            return [];
        }
    }
}