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