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