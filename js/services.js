 document.querySelectorAll('.toggle-service').forEach(header => {
    header.addEventListener('click', () => {
        const parent = header.closest('.service-detail');
        parent.classList.toggle('active');
    });
});
