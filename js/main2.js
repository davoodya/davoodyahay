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
    const chars = persian.split('');

    const fontSize = 14;
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

