// Portfolio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar category dropdowns
    initializeCategoryDropdowns();
    
    // Initialize filter buttons
    initializeFilterButtons();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize technology checkbox filters
    initializeTechFilters();
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
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const sidebarFilterOptions = document.querySelectorAll('.filter-option');
    
    // Function to filter portfolio items
    function filterPortfolioItems(filter) {
        portfolioItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'flex';
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = `slide-up 0.6s forwards ${parseFloat(item.style.getPropertyValue('--delay')) * 0.1}s`;
            } else {
                item.style.display = 'none';
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
            
            // Filter portfolio items
            filterPortfolioItems(button.dataset.filter);
            
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
            
            // Filter portfolio items
            filterPortfolioItems(option.dataset.filter);
            
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
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Function to perform search
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        
        portfolioItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const techTags = Array.from(item.querySelectorAll('.portfolio-tech span')).map(span => span.textContent.toLowerCase());
            
            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                techTags.some(tag => tag.includes(searchTerm))) {
                item.style.display = 'flex';
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = `slide-up 0.6s forwards ${parseFloat(item.style.getPropertyValue('--delay')) * 0.1}s`;
            } else {
                item.style.display = 'none';
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

// Function to initialize technology checkbox filters
function initializeTechFilters() {
    const techCheckboxes = document.querySelectorAll('.tech-checkbox');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Function to apply filters
    function applyFilters() {
        // Get selected technologies
        const selectedTechs = Array.from(techCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id.replace('tech-', ''));
        
        // If no technologies selected, show all items
        if (selectedTechs.length === 0) {
            portfolioItems.forEach(item => {
                item.style.display = 'flex';
            });
            return;
        }
        
        // Apply filters to portfolio items
        portfolioItems.forEach(item => {
            const techTags = Array.from(item.querySelectorAll('.portfolio-tech span')).map(span => span.textContent.toLowerCase());
            
            const matchesTech = selectedTechs.some(tech => {
                if (tech === 'python' && techTags.some(tag => tag.includes('python'))) return true;
                if (tech === 'cpp' && techTags.some(tag => tag.includes('c++'))) return true;
                if (tech === 'c' && techTags.some(tag => tag === 'c')) return true;
                if (tech === 'assembly' && techTags.some(tag => tag.includes('assembly'))) return true;
                if (tech === 'web' && techTags.some(tag => ['flask', 'websocket', 'html', 'css', 'javascript'].some(webTech => tag.includes(webTech)))) return true;
                return false;
            });
            
            // Show or hide item
            if (matchesTech) {
                item.style.display = 'flex';
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = `slide-up 0.6s forwards ${parseFloat(item.style.getPropertyValue('--delay')) * 0.1}s`;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update active filters display
        updateActiveFiltersFromCheckboxes();
    }
    
    // Add event listeners to checkboxes
    techCheckboxes.forEach(checkbox => {
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
    
    // Clear existing tech filters
    const existingTechFilters = activeFiltersContainer.querySelectorAll('.filter-tag[data-type^="tech-"]');
    existingTechFilters.forEach(filter => filter.remove());
    
    // Add tech filters
    const techCheckboxes = document.querySelectorAll('.tech-checkbox:checked');
    techCheckboxes.forEach(checkbox => {
        const techLabel = checkbox.nextElementSibling.textContent;
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.dataset.type = `tech-${checkbox.id}`;
        filterTag.innerHTML = `
            تکنولوژی: ${techLabel}
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
    if (!filterType.startsWith('tech-')) {
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
        
        // Show all portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.display = 'flex';
            // Reset animation
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = `slide-up 0.6s forwards ${parseFloat(item.style.getPropertyValue('--delay')) * 0.1}s`;
        });
    }
}
