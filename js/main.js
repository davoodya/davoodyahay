

// /* Matrix Animation Effect */
// const canvas = document.getElementById('matrix-canvas');
// const ctx = canvas.getContext('2d');
//
// // Set canvas dimensions
// function setCanvasDimensions() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
//
// // Initialize on load and resize
// window.addEventListener('load', setCanvasDimensions);
// window.addEventListener('resize', setCanvasDimensions);
//
// // Characters for matrix effect
// const persian = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۱۲۳۴۵۶۷۸۹۰';
// const english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>/?\\\'\"';
// const characters = persian + english + symbols;
//
// // Matrix effect settings
// const fontSize = 14;
// const columns = [];
// const drops = [];
//
// function initMatrix() {
//     // Calculate number of columns
//     const columnsCount = Math.floor(canvas.width / fontSize);
//
//     // Initialize columns and drops
//     for (let i = 0; i < columnsCount; i++) {
//         columns[i] = 1;
//         drops[i] = Math.random() * -100;
//     }
// }
//
// function drawMatrix() {
//     // Semi-transparent black to create fade effect
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//     // Set text color and font
//     ctx.fillStyle = '#00ff41';
//     ctx.font = `${fontSize}px monospace`;
//
//     // Draw characters
//     for (let i = 0; i < columns.length; i++) {
//         // Get random character
//         const text = characters.charAt(Math.floor(Math.random() * characters.length));
//
//         // Calculate position
//         const x = i * fontSize;
//         const y = drops[i] * fontSize;
//
//         // Draw the character
//         ctx.fillText(text, x, y);
//
//         // Reset position if it's at the bottom or randomly
//         if (y > canvas.height && Math.random() > 0.975) {
//             drops[i] = 0;
//         }
//
//         // Move drop down
//         drops[i]++;
//     }
// }
//
// // Initialize and start animation
// initMatrix();
// setInterval(drawMatrix, 50);
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Responsive Canvas Size
function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('load', () => {
    setCanvasDimensions();
    initMatrix();
});
window.addEventListener('resize', () => {
    setCanvasDimensions();
    initMatrix();
});

// Matrix Config
const persian = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۱۲۳۴۵۶۷۸۹۰';
const english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>/?\\\'\"';
const characters = (persian + english + symbols).split('');

const fontSize = 16;
let columns = [];
let drops = [];

function initMatrix() {
    const columnsCount = Math.floor(canvas.width / fontSize);
    columns = new Array(columnsCount).fill(0);
    drops = columns.map(() => Math.random() * -50);
}

const logoImage = new Image();
logoImage.src = 'images/davoodya.png';

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw logo at center (faded)
    const logoSize = 500;
    // X position for Center of Screen
    // const logoX = canvas.width / 2 - logoSize / 2;

    // X position for Left Side
    const logoX = 220;
    const logoY = canvas.height / 2 - logoSize / 2;

    // تنظیمات کیفیت و شفافیت
    ctx.globalAlpha = 1.0; // شفافیت کامل
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);


    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// initMatrix();
setInterval(drawMatrix, 45);




/* Typing Effect */
const typingElements = document.querySelectorAll('.typing-effect');

/* Old version Optimized Typing Effect */
// function typeEffect() {
//     const typingElements = document.querySelectorAll('.typing-effect');
//
//     typingElements.forEach(element => {
//         const text = element.getAttribute('data-text') || '';
//         const delay = parseInt(element.getAttribute('data-delay') || '0', 10);
//         const speed = parseInt(element.getAttribute('data-speed') || '50', 10);
//
//         if (!element.classList.contains('typing-started')) {
//             element.classList.add('typing-started');
//
//             setTimeout(() => {
//                 let i = 0;
//                 element.textContent = '';
//
//                 const typingInterval = setInterval(() => {
//                     if (i < text.length) {
//                         element.textContent += text[i++];
//                     } else {
//                         clearInterval(typingInterval);
//                         element.classList.add('typing-done');
//                     }
//                 }, speed);
//             }, delay);
//         }
//     });
// }

/* New Version Advanced Typing Effect */
function advancedTypingEffect() {
    const elements = document.querySelectorAll('.typing-effect');

    elements.forEach(element => {
        let texts = element.getAttribute('data-text') || '';
        let textArray;

        // بررسی آرایه بودن یا تک رشته
        try {
            textArray = JSON.parse(texts);
            if (!Array.isArray(textArray)) textArray = [texts];
        } catch (e) {
            textArray = [texts];
        }

        const delay = parseInt(element.getAttribute('data-delay') || '1000', 10);
        const speed = parseInt(element.getAttribute('data-speed') || '100', 10);
        const loop = element.hasAttribute('data-loop');

        let currentTextIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const fullText = textArray[currentTextIndex];
            const current = fullText.substring(0, charIndex);
            element.textContent = current;

            if (!isDeleting && charIndex < fullText.length) {
                charIndex++;
                setTimeout(type, speed);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, speed / 2);
            } else {
                if (!isDeleting && charIndex === fullText.length) {
                    if (loop) {
                        setTimeout(() => {
                            isDeleting = true;
                            type();
                        }, delay);
                    }
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % textArray.length;
                    setTimeout(type, delay);
                }
            }
        }

        setTimeout(type, delay);
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
                advancedTypingEffect();
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
// ایجاد ذرات متحرک
document.addEventListener('DOMContentLoaded', function() {
    const particles = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // موقعیت و اندازه تصادفی
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // تنظیم انیمیشن
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particles.appendChild(particle);
    }
});

// Change Glitch Texts
document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skill');
    let currentSkill = 0;

    function rotateSkills() {
        skills[currentSkill].classList.remove('active');
        currentSkill = (currentSkill + 1) % skills.length;
        skills[currentSkill].classList.add('active');

// فعال کردن افکت glitch هنگام تغییر
        skills[currentSkill].style.animation = 'none';
        void skills[currentSkill].offsetWidth; // Trigger reflow
        skills[currentSkill].style.animation = 'glitch-switch 0.5s linear';

        setTimeout(rotateSkills, 2000); // تغییر هر 2 ثانیه
    }

    setTimeout(rotateSkills, 2000); // شروع پس از 2 ثانیه
});
