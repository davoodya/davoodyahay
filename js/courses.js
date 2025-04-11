document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements and course data
    const courseCards = Array.from(document.querySelectorAll('.course-card'));
    const courseData = courseCards.map(card => ({
        element: card,
        title: card.querySelector('h3').textContent.toLowerCase(),
        description: card.querySelector('p').textContent.toLowerCase(),
        categories: card.dataset.category.split(' '),
        level: card.querySelector('.course-meta-item:nth-child(3) span').textContent.toLowerCase(),
        isFree: card.dataset.category.includes('free')
    }));

    // Current filter state
    const filterState = {
        category: 'all',
        levels: [],
        prices: [],
        searchTerm: ''
    };

    // Initialize all components
    initializeCategoryDropdowns();
    initializeFilterButtons(courseData, filterState);
    initializeSearch(courseData, filterState);
    initializeCheckboxFilters(courseData, filterState);
    setupFilterTagRemoval(courseData, filterState);
});

function initializeCategoryDropdowns() {
    const categoryContainer = document.querySelector('.category-list');

    categoryContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.category-item-header');
        if (!header) return;

        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.category-item.active').forEach(activeItem => {
            if (activeItem !== item) activeItem.classList.remove('active');
        });

        item.classList.toggle('active', !isActive);
    });
}

function initializeFilterButtons(courseData, filterState) {
    const filterContainer = document.querySelector('.filter-buttons');
    const sidebarFilterContainer = document.querySelector('.filter-options-list');

    function applyFilters() {
        courseData.forEach(data => {
            const categoryMatch = filterState.category === 'all' ||
                data.categories.includes(filterState.category);

            const levelMatch = filterState.levels.length === 0 ||
                filterState.levels.some(level => {
                    const levelMap = {
                        'beginner': 'مبتدی',
                        'intermediate': 'متوسط',
                        'advanced': 'پیشرفته'
                    };
                    return data.level.includes(levelMap[level]);
                });

            const priceMatch = filterState.prices.length === 0 ||
                ((filterState.prices.includes('free') && data.isFree) ||
                    (filterState.prices.includes('paid') && !data.isFree));

            const searchMatch = !filterState.searchTerm ||
                data.title.includes(filterState.searchTerm) ||
                data.description.includes(filterState.searchTerm);

            data.element.style.display = (categoryMatch && levelMatch && priceMatch && searchMatch)
                ? 'block' : 'none';
        });

        updateActiveFiltersDisplay(filterState);
    }

    function handleCategoryFilter(filter, text) {
        // Reset only category-related state
        filterState.category = filter;
        filterState.searchTerm = '';

        // Reset UI elements
        document.querySelectorAll('.filter-btn.active, .filter-option.active').forEach(el => {
            el.classList.remove('active');
        });

        document.getElementById('search-input').value = '';
        document.getElementById('sidebar-search-input').value = '';

        // Activate current filter
        event.currentTarget.classList.add('active');

        applyFilters();
    }

    filterContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.filter-btn');
        if (!button) return;
        handleCategoryFilter(button.dataset.filter, button.textContent);
    });

    sidebarFilterContainer.addEventListener('click', (e) => {
        const option = e.target.closest('.filter-option');
        if (!option) return;

        const filterName = option.querySelector('.filter-name').textContent.trim();
        handleCategoryFilter(option.dataset.filter, filterName);
    });
}

function initializeSearch(courseData, filterState) {
    const searchInput = document.getElementById('search-input');
    const sidebarSearchInput = document.getElementById('sidebar-search-input');

    function performSearch(searchTerm) {
        filterState.searchTerm = searchTerm.toLowerCase().trim();
        applyAllFilters(courseData, filterState);
    }

    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    const debouncedSearch = debounce(performSearch, 300);

    [searchInput, sidebarSearchInput].forEach(input => {
        input.addEventListener('input', (e) => {
            if (input === searchInput) {
                sidebarSearchInput.value = e.target.value;
            } else {
                searchInput.value = e.target.value;
            }
            debouncedSearch(e.target.value);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(e.target.value);
        });
    });
}

function initializeCheckboxFilters(courseData, filterState) {
    const filterContainer = document.querySelector('.filter-checkboxes');

    function handleCheckboxChange() {
        filterState.levels = Array.from(
            document.querySelectorAll('.level-checkbox:checked')
        ).map(checkbox => checkbox.id.replace('level-', ''));

        filterState.prices = Array.from(
            document.querySelectorAll('.price-checkbox:checked')
        ).map(checkbox => checkbox.id.replace('price-', ''));

        applyAllFilters(courseData, filterState);
    }

    filterContainer.addEventListener('change', (e) => {
        if (e.target.matches('.level-checkbox, .price-checkbox')) {
            handleCheckboxChange();
        }
    });
}

function applyAllFilters(courseData, filterState) {
    courseData.forEach(data => {
        const categoryMatch = filterState.category === 'all' ||
            data.categories.includes(filterState.category);

        const levelMatch = filterState.levels.length === 0 ||
            filterState.levels.some(level => {
                const levelMap = {
                    'beginner': 'مبتدی',
                    'intermediate': 'متوسط',
                    'advanced': 'پیشرفته'
                };
                return data.level.includes(levelMap[level]);
            });

        const priceMatch = filterState.prices.length === 0 ||
            ((filterState.prices.includes('free') && data.isFree) ||
                (filterState.prices.includes('paid') && !data.isFree));

        const searchMatch = !filterState.searchTerm ||
            data.title.includes(filterState.searchTerm) ||
            data.description.includes(filterState.searchTerm);

        data.element.style.display = (categoryMatch && levelMatch && priceMatch && searchMatch)
            ? 'block' : 'none';
    });

    updateActiveFiltersDisplay(filterState);
}

function updateActiveFiltersDisplay(filterState) {
    const activeFiltersContainer = document.getElementById('active-filters');

    // Clear only category and search filters (keep checkbox filters)
    const filtersToRemove = activeFiltersContainer.querySelectorAll(`
        .filter-tag[data-type="category"],
        .filter-tag[data-type="search"]
    `);
    filtersToRemove.forEach(filter => filter.remove());

    // Add category filter if not 'all'
    if (filterState.category !== 'all') {
        const activeCategory = document.querySelector(`
            .filter-btn[data-filter="${filterState.category}"], 
            .filter-option[data-filter="${filterState.category}"]
        `);
        if (activeCategory) {
            const filterText = activeCategory.classList.contains('filter-btn')
                ? activeCategory.textContent
                : activeCategory.querySelector('.filter-name').textContent.trim();

            addFilterTag(activeFiltersContainer, 'category', filterText);
        }
    }

    // Add level filters
    filterState.levels.forEach(level => {
        const checkbox = document.getElementById(`level-${level}`);
        if (checkbox && !activeFiltersContainer.querySelector(`.filter-tag[data-type="level-${level}"]`)) {
            const label = checkbox.nextElementSibling.textContent;
            addFilterTag(activeFiltersContainer, `level-${level}`, `سطح: ${label}`);
        }
    });

    // Add price filters
    filterState.prices.forEach(price => {
        const checkbox = document.getElementById(`price-${price}`);
        if (checkbox && !activeFiltersContainer.querySelector(`.filter-tag[data-type="price-${price}"]`)) {
            const label = checkbox.nextElementSibling.textContent;
            addFilterTag(activeFiltersContainer, `price-${price}`, `قیمت: ${label}`);
        }
    });

    // Add search filter
    if (filterState.searchTerm) {
        addFilterTag(activeFiltersContainer, 'search', `جستجو: ${filterState.searchTerm}`);
    }
}

function addFilterTag(container, type, text) {
    // Check if filter tag already exists
    if (container.querySelector(`.filter-tag[data-type="${type}"]`)) return;

    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    filterTag.dataset.type = type;
    filterTag.innerHTML = `
        ${text}
        <span class="remove-tag">×</span>
    `;
    container.appendChild(filterTag);
}

function setupFilterTagRemoval(courseData, filterState) {
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-tag')) return;

        const filterTag = e.target.parentElement;
        const filterType = filterTag.dataset.type;

        if (filterType === 'category') {
            // Reset to 'all' category
            document.querySelector('[data-filter="all"]').click();
        }
        else if (filterType.startsWith('level-')) {
            const checkbox = document.getElementById(filterType);
            if (checkbox) {
                checkbox.checked = false;
                checkbox.dispatchEvent(new Event('change'));
            }
        }
        else if (filterType.startsWith('price-')) {
            const checkbox = document.getElementById(filterType);
            if (checkbox) {
                checkbox.checked = false;
                checkbox.dispatchEvent(new Event('change'));
            }
        }
        else if (filterType === 'search') {
            filterState.searchTerm = '';
            document.getElementById('search-input').value = '';
            document.getElementById('sidebar-search-input').value = '';
            applyAllFilters(courseData, filterState);
        }
    });
}