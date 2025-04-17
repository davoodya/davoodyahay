function initMatrixAnimation() {
    const canvas = document.getElementById('matrix-canvas2');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // Persian/Arabic characters and numbers
    const persian = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹';
    const english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const chars = persian.split('') + english.split('');

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px Vazir';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Reset drops after resize
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    });
}

// function initMatrixAnimation2() {
//     const canvas = document.getElementById('matrix-canvas2');
//     if (!canvas) return;
//
//     const ctx = canvas.getContext('2d');
//     let animationId;
//     let lastTime = 0;
//     const fps = 30;
//     const frameInterval = 1000 / fps;
//
//     // Persian/Arabic characters and numbers
//     const persian = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹';
//     const chars = persian.split('');
//     const colors = ['#00ff41', '#00ff99', '#33ff00', '#66ff00', '#99ff00'];
//
//     function resizeCanvas() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         initDrops();
//     }
//
//     const drops = [];
//     const speeds = [];
//     const opacities = [];
//
//     function initDrops() {
//         const fontSize = Math.max(14, window.innerWidth / 100);
//         const columns = Math.floor(canvas.width / fontSize);
//
//         drops.length = 0;
//         speeds.length = 0;
//         opacities.length = 0;
//
//         for (let i = 0; i < columns; i++) {
//             drops.push({
//                 y: Math.random() * -100,
//                 speed: 0.5 + Math.random() * 2,
//                 length: 5 + Math.floor(Math.random() * 15),
//                 chars: [],
//                 lastChange: 0
//             });
//
//             // Initialize character positions
//             for (let j = 0; j < drops[i].length; j++) {
//                 drops[i].chars.push({
//                     char: chars[Math.floor(Math.random() * chars.length)],
//                     opacity: 1 - (j / drops[i].length)
//                 });
//             }
//         }
//     }
//
//     function draw(timestamp) {
//         if (!lastTime) lastTime = timestamp;
//         const deltaTime = timestamp - lastTime;
//
//         if (deltaTime > frameInterval) {
//             ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//             const fontSize = Math.max(14, window.innerWidth / 100);
//             ctx.font = `${fontSize}px Vazir`;
//             ctx.textAlign = 'center';
//
//             for (let i = 0; i < drops.length; i++) {
//                 const x = i * fontSize + fontSize / 2;
//                 const drop = drops[i];
//
//                 // Update drop position
//                 drop.y += drop.speed;
//
//                 // Change characters occasionally
//                 if (timestamp - drop.lastChange > 100 + Math.random() * 900) {
//                     for (let j = 0; j < drop.chars.length; j++) {
//                         drop.chars[j].char = chars[Math.floor(Math.random() * chars.length)];
//                     }
//                     drop.lastChange = timestamp;
//                 }
//
//                 // Draw each character in the drop
//                 for (let j = 0; j < drop.chars.length; j++) {
//                     const charY = drop.y - j * fontSize;
//
//                     if (charY > -fontSize && charY < canvas.height) {
//                         const colorIndex = Math.floor(j / drop.chars.length * colors.length);
//                         ctx.fillStyle = colors[colorIndex];
//                         ctx.globalAlpha = drop.chars[j].opacity;
//                         ctx.fillText(drop.chars[j].char, x, charY);
//                     }
//                 }
//
//                 // Reset drop when it goes off screen
//                 if (drop.y - drop.length * fontSize > canvas.height) {
//                     drop.y = Math.random() * -100;
//                     drop.speed = 0.5 + Math.random() * 2;
//                 }
//             }
//
//             lastTime = timestamp - (deltaTime % frameInterval);
//         }
//
//         animationId = requestAnimationFrame(draw);
//     }
//
//     function startAnimation() {
//         resizeCanvas();
//         animationId = requestAnimationFrame(draw);
//     }
//
//     function stopAnimation() {
//         cancelAnimationFrame(animationId);
//     }
//
//     // Initialize
//     startAnimation();
//
//     // Event listeners
//     window.addEventListener('resize', () => {
//         resizeCanvas();
//     });
//
//     // Pause animation when tab is not visible
//     document.addEventListener('visibilitychange', () => {
//         if (document.hidden) {
//             stopAnimation();
//         } else {
//             startAnimation();
//         }
//     });
//
//     // Return cleanup function
//     return stopAnimation;
// }

// // Initialize with auto-start
// const stopMatrixAnimation = initMatrixAnimation2();

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

document.addEventListener('DOMContentLoaded', function() {
    const matrixRain = document.getElementById('matrix-rain');
    const columns = Math.floor(window.innerWidth / 20);
    const chars = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.setProperty('--speed', 5 + Math.random() * 10);
        column.style.setProperty('--delay', Math.random() * 5);
        column.style.setProperty('--column-delay', i * 0.1);

        const charsCount = 20 + Math.floor(Math.random() * 20);
        for (let j = 0; j < charsCount; j++) {
            const char = document.createElement('span');
            char.className = 'matrix-character';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.setProperty('--char-index', j);
            column.appendChild(char);
        }

        matrixRain.appendChild(column);
    }
});