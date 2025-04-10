// Articles Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix Canvas Animation
    initMatrixAnimation();
    
    // Initialize Articles Filtering and Search
    initArticlesFiltering();
    
    // Initialize Pagination
    initPagination();
    
    // Initialize Category Dropdowns
    initCategoryDropdowns();
    
    // Initialize Preloader
    initPreloader();
});

// Matrix Canvas Animation

// Articles Filtering and Search
function initArticlesFiltering() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const tagFilter = document.getElementById('tag-filter');
    const sortFilter = document.getElementById('sort-filter');
    const articlesContainer = document.getElementById('articles-container');
    const activeFilters = document.getElementById('active-filters');

    // Sidebar search
    const sidebarSearchInput = document.getElementById('sidebar-search-input');
    const sidebarSearchBtn = document.getElementById('sidebar-search-btn');

    if (!searchInput || !articlesContainer) return;

    // Current active filters
    let filters = {
        search: '',
        category: 'all',
        tag: 'all',
        sort: 'newest'
    };

    // Apply filters function
    function applyFilters() {
        const allArticles = Array.from(articlesContainer.querySelectorAll('.article-card'));

        let filteredArticles = allArticles.filter(article => {
            let visible = true;

            if (filters.category !== 'all' && article.dataset.category !== filters.category) {
                visible = false;
            }

            if (filters.tag !== 'all') {
                const articleTags = article.dataset.tags ? article.dataset.tags.split(',') : [];
                if (!articleTags.includes(filters.tag)) {
                    visible = false;
                }
            }

            if (filters.search !== '') {
                const articleTitle = article.querySelector('h3').textContent.toLowerCase();
                const articleContent = article.querySelector('p').textContent.toLowerCase();
                const articleTags = article.dataset.tags ? article.dataset.tags.split(',').join(' ') : '';
                const searchTerm = filters.search.toLowerCase();

                if (!articleTitle.includes(searchTerm) &&
                    !articleContent.includes(searchTerm) &&
                    !articleTags.includes(searchTerm)) {
                    visible = false;
                }
            }

            return visible;
        });

        // Hide all articles
        allArticles.forEach(article => {
            article.style.display = 'none';
        });

        // Sort filtered articles only
        sortArticles(filters.sort, filteredArticles);

        // Update active filters UI
        updateActiveFilters();
        updateActiveTags();

        // Fire event to update pagination
        document.dispatchEvent(new CustomEvent('filtersUpdated', { detail: { filteredArticles } }));
    }


// تابع جدید برای برجسته کردن تگ‌های فعال
    function updateActiveTags() {
        const tagCloudItems = document.querySelectorAll('.tag-cloud-item');
        const currentSearch = filters.search.toLowerCase();

        tagCloudItems.forEach(item => {
            const tagText = item.dataset.tag.toLowerCase();

            if (currentSearch === tagText) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Sort articles function
    function sortArticles(sortType, articles = null) {
        const list = articles || Array.from(articlesContainer.querySelectorAll('.article-card:not([style*="display: none"])'));

        list.sort((a, b) => {
            const dateA = a.querySelector('.article-meta-item span').textContent;
            const dateB = b.querySelector('.article-meta-item span').textContent;
            const viewsA = parseInt(a.querySelectorAll('.article-meta-item span')[1].textContent.replace(/[^\d]/g, ''));
            const viewsB = parseInt(b.querySelectorAll('.article-meta-item span')[1].textContent.replace(/[^\d]/g, ''));

            if (sortType === 'newest') return dateB.localeCompare(dateA);
            if (sortType === 'oldest') return dateA.localeCompare(dateB);
            if (sortType === 'popular') return viewsB - viewsA;

            return 0;
        });

        list.forEach(article => articlesContainer.appendChild(article));
    }


    // Update active filters display
    function updateActiveFilters() {
        if (!activeFilters) return;

        activeFilters.innerHTML = '';

        // Add search filter tag
        if (filters.search !== '') {
            const filterTag = document.createElement('div');
            filterTag.className = 'filter-tag';
            filterTag.innerHTML = `جستجو: ${filters.search} <span class="remove-tag" data-filter="search">×</span>`;
            activeFilters.appendChild(filterTag);
        }

        // Add category filter tag
        if (filters.category !== 'all') {
            const categoryName = categoryFilter.options[categoryFilter.selectedIndex].text;
            const filterTag = document.createElement('div');
            filterTag.className = 'filter-tag';
            filterTag.innerHTML = `دسته: ${categoryName} <span class="remove-tag" data-filter="category">×</span>`;
            activeFilters.appendChild(filterTag);
        }

        // Add tag filter tag
        if (filters.tag !== 'all') {
            const tagName = tagFilter.options[tagFilter.selectedIndex].text;
            const filterTag = document.createElement('div');
            filterTag.className = 'filter-tag';
            filterTag.innerHTML = `برچسب: ${tagName} <span class="remove-tag" data-filter="tag">×</span>`;
            activeFilters.appendChild(filterTag);
        }

        // Add event listeners to remove filter tags
        const removeTags = document.querySelectorAll('.remove-tag');
        removeTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const filterType = this.dataset.filter;

                if (filterType === 'search') {
                    filters.search = '';
                    searchInput.value = '';
                    if (sidebarSearchInput) sidebarSearchInput.value = '';
                } else if (filterType === 'category') {
                    filters.category = 'all';
                    categoryFilter.value = 'all';
                } else if (filterType === 'tag') {
                    filters.tag = 'all';
                    tagFilter.value = 'all';
                }

                applyFilters();
            });
        });
    }

    // Event listeners for main search
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            filters.search = searchInput.value.trim();
            if (sidebarSearchInput) sidebarSearchInput.value = searchInput.value.trim();
            applyFilters();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filters.search = searchInput.value.trim();
                if (sidebarSearchInput) sidebarSearchInput.value = searchInput.value.trim();
                applyFilters();
            }
        });
    }

    // Event listeners for sidebar search
    if (sidebarSearchBtn && sidebarSearchInput) {
        sidebarSearchBtn.addEventListener('click', function() {
            filters.search = sidebarSearchInput.value.trim();
            if (searchInput) searchInput.value = sidebarSearchInput.value.trim();
            applyFilters();
        });

        sidebarSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filters.search = sidebarSearchInput.value.trim();
                if (searchInput) searchInput.value = sidebarSearchInput.value.trim();
                applyFilters();
            }
        });
    }

    // Event listeners for filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filters.category = this.value;
            applyFilters();
        });
    }

    if (tagFilter) {
        tagFilter.addEventListener('change', function() {
            filters.tag = this.value;
            applyFilters();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            filters.sort = this.value;
            applyFilters();
        });
    }

    // Tag cloud click handler
    const tagCloudItems = document.querySelectorAll('.tag-cloud-item');
    tagCloudItems.forEach(item => {
        item.addEventListener('click', function() {
            const tagText = this.dataset.tag;

            // Set search input value
            if (searchInput) searchInput.value = tagText;
            if (sidebarSearchInput) sidebarSearchInput.value = tagText;

            // Update filters
            filters.search = tagText;
            filters.category = 'all';
            filters.tag = 'all';

            // Reset dropdowns
            if (categoryFilter) categoryFilter.value = 'all';
            if (tagFilter) tagFilter.value = 'all';

            // Apply filters
            applyFilters();

            // Scroll to articles section
            document.querySelector('.articles-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initPagination() {
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const paginationContainer = document.getElementById('pagination-numbers');
    const articlesContainer = document.getElementById('articles-container');

    if (!prevPageBtn || !nextPageBtn || !paginationContainer || !articlesContainer) return;

    const ARTICLES_PER_PAGE = 4;
    let currentPage = 1;
    let currentArticles = [];

    function renderPaginationButtons(totalPages) {
        paginationContainer.innerHTML = ''; // پاک کردن دکمه‌های قبلی

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination-btn';
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');

            btn.addEventListener('click', function () {
                currentPage = i;
                updatePagination();
            });

            paginationContainer.appendChild(btn);
        }
    }

    function updatePagination(articles = null) {
        if (articles) currentArticles = articles;

        const totalPages = Math.max(1, Math.ceil(currentArticles.length / ARTICLES_PER_PAGE));

        renderPaginationButtons(totalPages);

        // نمایش فقط مقالات مربوط به صفحه فعلی
        document.querySelectorAll('.article-card').forEach(article => {
            article.style.display = 'none';
        });

        const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
        const endIndex = Math.min(startIndex + ARTICLES_PER_PAGE, currentArticles.length);

        for (let i = startIndex; i < endIndex; i++) {
            if (currentArticles[i]) {
                currentArticles[i].style.display = 'block';
            }
        }

        // دکمه‌های قبلی و بعدی
        prevPageBtn.classList.toggle('disabled', currentPage <= 1);
        nextPageBtn.classList.toggle('disabled', currentPage >= totalPages);

        window.scrollTo({
            top: articlesContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    }

    prevPageBtn.addEventListener('click', function () {
        if (!this.classList.contains('disabled') && currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextPageBtn.addEventListener('click', function () {
        if (!this.classList.contains('disabled')) {
            currentPage++;
            updatePagination();
        }
    });

    document.addEventListener('filtersUpdated', function (e) {
        currentPage = 1;
        updatePagination(e.detail.filteredArticles);
    });

    const initialArticles = Array.from(articlesContainer.querySelectorAll('.article-card'));
    updatePagination(initialArticles);
}



// در تابع applyFilters، بعد از اعمال فیلترها این خط را اضافه کنید:
// dispatchEvent(new Event('filtersUpdated'));

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
// اضافه کردن این کد به فایل JS موجود
document.addEventListener('DOMContentLoaded', function() {
    const selectElements = document.querySelectorAll('.filter-select');

    selectElements.forEach(select => {
        // Highlight selected option
        select.addEventListener('change', function() {
            this.style.color = this.value === 'all' ? 'var(--main-text)' : 'var(--accent-green)';
        });

        // Initialize color based on current value
        select.style.color = select.value === 'all' ? 'var(--main-text)' : 'var(--accent-green)';
    });
});