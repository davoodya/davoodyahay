/* Matrix Animation Effect */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize on load and resize
window.addEventListener('load', setCanvasDimensions);
window.addEventListener('resize', setCanvasDimensions);

// Characters for matrix effect
const persian = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۱۲۳۴۵۶۷۸۹۰';
const english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>/?\\\'\"';
const characters = persian + english + symbols;

// Matrix effect settings
const fontSize = 14;
const columns = [];
const drops = [];

function initMatrix() {
    // Calculate number of columns
    const columnsCount = Math.floor(canvas.width / fontSize);
    
    // Initialize columns and drops
    for (let i = 0; i < columnsCount; i++) {
        columns[i] = 1;
        drops[i] = Math.random() * -100;
    }
}

function drawMatrix() {
    // Semi-transparent black to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text color and font
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;
    
    // Draw characters
    for (let i = 0; i < columns.length; i++) {
        // Get random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Draw the character
        ctx.fillText(text, x, y);
        
        // Reset position if it's at the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
    }
}

// Initialize and start animation
initMatrix();
setInterval(drawMatrix, 50);

/* Typing Effect */
const typingElements = document.querySelectorAll('.typing-effect');

function typeEffect() {
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        const delay = parseInt(element.getAttribute('data-delay') || '0');
        const speed = parseInt(element.getAttribute('data-speed') || '50');
        
        if (!element.classList.contains('typing-started')) {
            element.classList.add('typing-started');
            
            setTimeout(() => {
                let i = 0;
                element.textContent = '';
                
                const typing = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typing);
                        element.classList.add('typing-done');
                    }
                }, speed);
            }, delay);
        }
    });
}

/* Scroll Animations */
const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
        }
    });
}

/* Navigation Toggle */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

/* Preloader */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Wait a bit for a more dramatic effect
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';

                // Trigger animations after preloader
                typeEffect();
                checkScroll();
            }, 600); // matches CSS transition
        }, 1500); // total visible duration
    }
});

/* Scroll Event Listener */
window.addEventListener('scroll', checkScroll);

/* Initialize on load */
document.addEventListener('DOMContentLoaded', () => {
    // Fallback if preloader is removed
    if (!document.querySelector('.preloader')) {
        typeEffect();
        checkScroll();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});
