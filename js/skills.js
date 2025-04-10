// Skills and Certificates Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix Canvas Animation
    initMatrixAnimation();
    
    // Initialize Tabs
    initTabs();
    
    // Initialize Skill Categories
    initSkillCategories();
    
    // Initialize Certificate Categories
    initCertificateCategories();
    
    // Initialize Certificate Modal
    initCertificateModal();
    
    // Initialize Skill Progress Bars
    initSkillProgressBars();
    
    // Initialize Preloader
    initPreloader();
    
    // Initialize Animation Effects
    initAnimationEffects();
});


// Tabs Functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
}

// Skill Categories Functionality - Fixed to prevent multiple categories opening together
function initSkillCategories() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const header = category.querySelector('.skill-category-header');
        
        header.addEventListener('click', function(e) {
            // Prevent event bubbling
            e.stopPropagation();
            
            // Toggle active class for clicked category
            const isActive = category.classList.contains('active');
            
            // Close all categories first
            skillCategories.forEach(otherCategory => {
                otherCategory.classList.remove('active');
            });
            
            // If it wasn't active before, make it active now
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });
}

// Certificate Categories Functionality - Fixed to prevent multiple categories opening together
function initCertificateCategories() {
    const certificateCategories = document.querySelectorAll('.certificate-category');
    
    certificateCategories.forEach(category => {
        const header = category.querySelector('.certificate-category-header');
        
        header.addEventListener('click', function(e) {
            // Prevent event bubbling
            e.stopPropagation();
            
            // Toggle active class for clicked category
            const isActive = category.classList.contains('active');
            
            // Close all categories first
            certificateCategories.forEach(otherCategory => {
                otherCategory.classList.remove('active');
            });
            
            // If it wasn't active before, make it active now
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });
}

// Certificate Modal Functionality
function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('certificate-modal-image');
    const closeBtn = document.querySelector('.close-certificate-modal');
    const certificateImages = document.querySelectorAll('.certificate-image');
    
    // Open modal when certificate image is clicked
    certificateImages.forEach(img => {
        img.addEventListener('click', function(e) {
            // Prevent event bubbling
            e.stopPropagation();
            
            modal.classList.add('show');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            
            // Re-enable scrolling
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            
            // Re-enable scrolling
            document.body.style.overflow = 'auto';
        }
    });
}

// Skill Progress Bars Animation
function initSkillProgressBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate progress bars
    function animateProgressBars() {
        skillProgressBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
                bar.classList.add('animated');
                
                // Add counter animation
                const parent = bar.parentElement.parentElement;
                const percentageElement = parent.querySelector('.skill-percentage');
                
                if (percentageElement) {
                    let startValue = 0;
                    const endValue = parseInt(percentage);
                    const duration = 1500;
                    const increment = Math.ceil(endValue / (duration / 15));
                    
                    const counter = setInterval(() => {
                        startValue += increment;
                        
                        if (startValue > endValue) {
                            startValue = endValue;
                            clearInterval(counter);
                        }
                        
                        percentageElement.textContent = `${startValue}%`;
                    }, 15);
                }
            }
        });
    }
    
    // Initial check
    animateProgressBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
    
    // Check when skill category is opened
    const skillCategoryHeaders = document.querySelectorAll('.skill-category-header');
    skillCategoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Delay to allow for the category to open
            setTimeout(animateProgressBars, 500);
        });
    });
}

// Enhanced Animation Effects
function initAnimationEffects() {
    // Floating effect for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        // Add staggered animation delay
        category.style.animationDelay = `${index * 0.1}s`;
        category.classList.add('float-animation');
    });
    
    // Glow effect for skill bars on hover
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.classList.add('glow-effect');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.classList.remove('glow-effect');
            }
        });
    });
    
    // Pulse animation for certificate images
    const certificateImages = document.querySelectorAll('.certificate-image');
    
    certificateImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        
        img.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    });
    
    // Particle effect for tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('particle-effect');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('particle-effect');
        });
    });
}

// Preloader


// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});
