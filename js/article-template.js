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
function initMatrixAnimation() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Persian/Arabic characters and numbers
    const persian = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹';
    const chars = persian.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track the Y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Drawing the characters
    function draw() {
        // Black semi-transparent background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41'; // Matrix green color
        ctx.font = fontSize + 'px Vazir';
        
        // Loop through each drop
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop position if it's at the bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move the drop down
            drops[i]++;
        }
    }
    
    // Animation loop
    setInterval(draw, 33);
    
    // Resize canvas when window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Category Dropdowns Functionality
function initCategoryDropdowns() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        const header = item.querySelector('.category-item-header');
        const dropdown = item.querySelector('.category-dropdown');
        
        header.addEventListener('click', function() {
            // Toggle active class for clicked category
            const isActive = item.classList.contains('active');
            
            // Close all dropdowns first
            categoryItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // If it wasn't active before, make it active now
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

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
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 600);
        }, 500);
    });
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});
