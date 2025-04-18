// Article Template JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix Canvas Animation
    initMatrixAnimation();
    
    // Initialize Category Dropdowns
    initCategoryDropdowns();
    
    // Initialize Code Highlighting
    initCodeHighlighting();
    
    // Initialize Table of Contents
    initTableOfContents();
    
    // Initialize Image Lightbox
    initImageLightbox();
    
    // Initialize Preloader
    initPreloader();
});

// Matrix Canvas Animation

// Code Highlighting with Prism.js
function initCodeHighlighting() {
    // Prism.js is loaded via CDN in the HTML
    // This will automatically highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}


// Table of Contents Generation
function initTableOfContents() {
    const articleBody = document.querySelector('.article-body');
    const tocContainer = document.querySelector('.table-of-contents');
    
    if (!articleBody || !tocContainer) return;
    
    const headings = articleBody.querySelectorAll('h2, h3');
    
    if (headings.length > 0) {
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        headings.forEach((heading, index) => {
            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const listItem = document.createElement('li');
            listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
            
            // Add click event to scroll smoothly
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        tocContainer.appendChild(tocList);
    } else {
        tocContainer.style.display = 'none';
    }
}

// Image Lightbox
function initImageLightbox() {
    const articleImages = document.querySelectorAll('.article-body img');
    const lightbox = document.getElementById('image-lightbox');
    
    if (!lightbox) return;
    
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    
    articleImages.forEach(img => {
        // Make images clickable
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('show');
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox when clicking the close button
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Preloader
function initCategoryDropdowns() {
    const categoryItems = document.querySelectorAll('.category-item');

    // Close all dropdowns initially
    categoryItems.forEach(item => {
        item.classList.remove('active');
    });

    categoryItems.forEach(item => {
        const header = item.querySelector('.category-item-header');
        const dropdown = item.querySelector('.category-dropdown');

        header.addEventListener('click', function(e) {
            e.stopPropagation();

            // Check if clicked category is already active
            const isActive = item.classList.contains('active');

            // Close all dropdowns first
            categoryItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Open clicked category if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        categoryItems.forEach(item => {
            item.classList.remove('active');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCategoryDropdowns();
});

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

// Copy button for code blocks
document.querySelectorAll('.article-body pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.addEventListener('click', () => {
        const code = pre.querySelector('code');
        navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 2000);
    });
    pre.appendChild(button);
});

// تابع کپی لینک مقاله
function copyArticleLink() {
    const linkInput = document.getElementById('article-link');
    linkInput.select();
    document.execCommand('copy');
    alert('لینک مقاله کپی شد!');
}

// تابع اشتراک در اینستاگرام
function shareToInstagram() {
    alert('برای اشتراک در اینستاگرام، لینک مقاله را در استوری یا پست خود قرار دهید.');
    return false;
}

// تابع اشتراک در یوتیوب
function shareToYouTube() {
    alert('برای اشتراک در یوتیوب، لینک مقاله را در توضیحات ویدیو قرار دهید.');
    return false;
}

// جایگزینی متغیرهای ARTICLE_URL و ARTICLE_TITLE با مقادیر واقعی
document.addEventListener('DOMContentLoaded', function() {
    const articleUrl = encodeURIComponent(window.location.href);
    const articleTitle = encodeURIComponent(document.title);

    document.querySelectorAll('[href*="ARTICLE_URL"], [href*="ARTICLE_TITLE"]').forEach(link => {
        link.href = link.href.replace('ARTICLE_URL', articleUrl).replace('ARTICLE_TITLE', articleTitle);
    });

    document.getElementById('article-link').value = window.location.href;
});