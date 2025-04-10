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
        const articles = Array.from(articlesContainer.querySelectorAll('.article-card'));
        
        // Filter articles based on current filters
        articles.forEach(article => {
            let visible = true;
            
            // Category filter
            if (filters.category !== 'all' && article.dataset.category !== filters.category) {
                visible = false;
            }
            
            // Tag filter
            if (filters.tag !== 'all') {
                const articleTags = article.dataset.tags ? article.dataset.tags.split(',') : [];
                if (!articleTags.includes(filters.tag)) {
                    visible = false;
                }
            }
            
            // Search filter
            if (filters.search !== '') {
                const articleTitle = article.querySelector('h3').textContent.toLowerCase();
                const articleContent = article.querySelector('p').textContent.toLowerCase();
                const searchTerm = filters.search.toLowerCase();
                
                if (!articleTitle.includes(searchTerm) && !articleContent.includes(searchTerm)) {
                    visible = false;
                }
            }
            
            // Show or hide article
            article.style.display = visible ? 'block' : 'none';
        });
        
        // Sort articles
        sortArticles(filters.sort);
        
        // Update active filters display
        updateActiveFilters();
    }
    
    // Sort articles function
    function sortArticles(sortType) {
        const articles = Array.from(articlesContainer.querySelectorAll('.article-card:not([style*="display: none"])'));
        
        articles.sort((a, b) => {
            const dateA = a.querySelector('.article-meta-item span').textContent;
            const dateB = b.querySelector('.article-meta-item span').textContent;
            const viewsA = parseInt(a.querySelectorAll('.article-meta-item span')[1].textContent.replace(/[^\d]/g, ''));
            const viewsB = parseInt(b.querySelectorAll('.article-meta-item span')[1].textContent.replace(/[^\d]/g, ''));
            
            if (sortType === 'newest') {
                // Sort by date (newest first) - Note: This is simplified and assumes the date format is consistent
                return dateB.localeCompare(dateA);
            } else if (sortType === 'oldest') {
                // Sort by date (oldest first)
                return dateA.localeCompare(dateB);
            } else if (sortType === 'popular') {
                // Sort by views (most views first)
                return viewsB - viewsA;
            }
            
            return 0;
        });
        
        // Reorder articles in the DOM
        articles.forEach(article => {
            articlesContainer.appendChild(article);
        });
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
}

// Pagination
function initPagination() {
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(#prev-page):not(#next-page)');
    
    if (!prevPageBtn || !nextPageBtn || paginationBtns.length === 0) return;
    
    // Current page
    let currentPage = 1;
    const totalPages = paginationBtns.length;
    
    // Update pagination buttons
    function updatePagination() {
        // Update page buttons
        paginationBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === currentPage);
        });
        
        // Update prev/next buttons
        prevPageBtn.classList.toggle('disabled', currentPage === 1);
        nextPageBtn.classList.toggle('disabled', currentPage === totalPages);
    }
    
    // Event listeners
    paginationBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            currentPage = index + 1;
            updatePagination();
            // Here you would load the articles for the selected page
            // For now, we'll just scroll to the top of the articles section
            document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
            document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Preloader
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

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});
