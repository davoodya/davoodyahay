
// Courses Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar category dropdowns
    initializeCategoryDropdowns();
    
    // Initialize filter buttons
    initializeFilterButtons();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize checkbox filters
    initializeCheckboxFilters();
});

// Function to initialize category dropdowns in sidebar
function initializeCategoryDropdowns() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        const header = item.querySelector('.category-item-header');
        
        header.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other dropdowns
            categoryItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Function to initialize filter buttons
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const sidebarFilterOptions = document.querySelectorAll('.filter-option');
    
    // Function to filter courses
    function filterCourses(filter) {
        courseCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update sidebar filter options
            sidebarFilterOptions.forEach(option => {
                if (option.dataset.filter === button.dataset.filter) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
            
            // Filter courses
            filterCourses(button.dataset.filter);
            
            // Update active filters display
            updateActiveFilters(button.dataset.filter, button.textContent);
        });
    });
    
    // Add click event to sidebar filter options
    sidebarFilterOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            sidebarFilterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update filter buttons
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === option.dataset.filter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // Filter courses
            filterCourses(option.dataset.filter);
            
            // Update active filters display
            const filterName = option.querySelector('.filter-name').textContent.trim();
            updateActiveFilters(option.dataset.filter, filterName);
        });
    });
}

// Function to initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const sidebarSearchInput = document.getElementById('sidebar-search-input');
    const searchBtn = document.getElementById('search-btn');
    const sidebarSearchBtn = document.getElementById('sidebar-search-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    // Function to perform search
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active filters display
        if (searchTerm) {
            updateActiveFilters('search', `جستجو: ${searchTerm}`);
        }
    }
    
    // Add event listeners for search buttons
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    sidebarSearchBtn.addEventListener('click', () => {
        // Sync the search inputs
        searchInput.value = sidebarSearchInput.value;
        performSearch(sidebarSearchInput.value);
    });
    
    // Add event listeners for Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    sidebarSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Sync the search inputs
            searchInput.value = sidebarSearchInput.value;
            performSearch(sidebarSearchInput.value);
        }
    });
}

// Function to initialize checkbox filters
function initializeCheckboxFilters() {
    const levelCheckboxes = document.querySelectorAll('.level-checkbox');
    const priceCheckboxes = document.querySelectorAll('.price-checkbox');
    const courseCards = document.querySelectorAll('.course-card');
    
    // Function to apply filters
    function applyFilters() {
        // Get selected levels
        const selectedLevels = Array.from(levelCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id.replace('level-', ''));
        
        // Get selected price options
        const selectedPrices = Array.from(priceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id.replace('price-', ''));
        
        // Apply filters to course cards
        courseCards.forEach(card => {
            let showCard = true;
            
            // Check if card matches level filter
            if (selectedLevels.length > 0) {
                const cardLevel = card.querySelector('.course-meta-item:nth-child(3) span').textContent.toLowerCase();
                const matchesLevel = selectedLevels.some(level => {
                    if (level === 'beginner' && cardLevel.includes('مبتدی')) return true;
                    if (level === 'intermediate' && cardLevel.includes('متوسط')) return true;
                    if (level === 'advanced' && cardLevel.includes('پیشرفته')) return true;
                    return false;
                });
                
                if (!matchesLevel) {
                    showCard = false;
                }
            }
            
            // Check if card matches price filter
            if (selectedPrices.length > 0 && showCard) {
                const isFree = card.dataset.category.includes('free');
                const matchesPrice = (isFree && selectedPrices.includes('free')) || 
                                    (!isFree && selectedPrices.includes('paid'));
                
                if (!matchesPrice) {
                    showCard = false;
                }
            }
            
            // Show or hide card
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Update active filters display
        updateActiveFiltersFromCheckboxes();
    }
    
    // Add event listeners to checkboxes
    levelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

// Function to update active filters display
function updateActiveFilters(filterType, filterText) {
    const activeFiltersContainer = document.getElementById('active-filters');
    
    // Clear existing filters of the same type
    const existingFilters = activeFiltersContainer.querySelectorAll(`.filter-tag[data-type="${filterType}"]`);
    existingFilters.forEach(filter => filter.remove());
    
    // If filter is 'all', clear all filters
    if (filterType === 'all') {
        activeFiltersContainer.innerHTML = '';
        return;
    }
    
    // Create new filter tag
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    filterTag.dataset.type = filterType;
    filterTag.innerHTML = `
        ${filterText}
        <span class="remove-tag" onclick="removeFilter(this)">×</span>
    `;
    
    // Add filter tag to container
    activeFiltersContainer.appendChild(filterTag);
}

// Function to update active filters from checkboxes
function updateActiveFiltersFromCheckboxes() {
    const activeFiltersContainer = document.getElementById('active-filters');
    
    // Clear existing level and price filters
    const existingLevelFilters = activeFiltersContainer.querySelectorAll('.filter-tag[data-type^="level-"]');
    existingLevelFilters.forEach(filter => filter.remove());
    
    const existingPriceFilters = activeFiltersContainer.querySelectorAll('.filter-tag[data-type^="price-"]');
    existingPriceFilters.forEach(filter => filter.remove());
    
    // Add level filters
    const levelCheckboxes = document.querySelectorAll('.level-checkbox:checked');
    levelCheckboxes.forEach(checkbox => {
        const levelLabel = checkbox.nextElementSibling.textContent;
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.dataset.type = `level-${checkbox.id}`;
        filterTag.innerHTML = `
            سطح: ${levelLabel}
            <span class="remove-tag" onclick="removeFilter(this, '${checkbox.id}')">×</span>
        `;
        
        activeFiltersContainer.appendChild(filterTag);
    });
    
    // Add price filters
    const priceCheckboxes = document.querySelectorAll('.price-checkbox:checked');
    priceCheckboxes.forEach(checkbox => {
        const priceLabel = checkbox.nextElementSibling.textContent;
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.dataset.type = `price-${checkbox.id}`;
        filterTag.innerHTML = `
            قیمت: ${priceLabel}
            <span class="remove-tag" onclick="removeFilter(this, '${checkbox.id}')">×</span>
        `;
        
        activeFiltersContainer.appendChild(filterTag);
    });
}

// Function to remove filter
function removeFilter(element, checkboxId) {
    const filterTag = element.parentElement;
    const filterType = filterTag.dataset.type;
    
    // Remove filter tag
    filterTag.remove();
    
    // If checkbox ID is provided, uncheck the corresponding checkbox
    if (checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = false;
            
            // Trigger change event to update filters
            const event = new Event('change');
            checkbox.dispatchEvent(event);
        }
        return;
    }
    
    // If filter type is 'search', clear search inputs
    if (filterType === 'search') {
        document.getElementById('search-input').value = '';
        document.getElementById('sidebar-search-input').value = '';
    }
    
    // Reset filter buttons if not a checkbox filter
    if (!filterType.startsWith('level-') && !filterType.startsWith('price-')) {
        // Activate 'all' filter button and option
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.filter-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.filter === 'all') {
                option.classList.add('active');
            }
        });
        
        // Show all courses
        document.querySelectorAll('.course-card').forEach(card => {
            card.style.display = 'block';
        });
    }
}
