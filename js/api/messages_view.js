document.addEventListener('DOMContentLoaded', function() {
    // انتخاب تمام دکمه‌های نمایش پیام
    const showMessageBtns = document.querySelectorAll('.show-message-btn');
    const modal = document.getElementById('messageModal');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');

    // اضافه کردن رویداد کلیک برای هر دکمه
    showMessageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fullMessage = this.getAttribute('data-message');
            modalBody.textContent = fullMessage;
            modal.style.display = 'block';
        });
    });

    // بستن ماژول با کلیک روی ضربدر
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // بستن ماژول با کلیک خارج از آن
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});