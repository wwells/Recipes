// Recipe Manager App
let allRecipes = [];
let currentRecipes = [];
let currentFilter = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Recipe Manager loaded');
    
    // Initialize the app
    initApp();
});

function initApp() {
    // Load recipes from JSON file
    loadRecipes();
    
    // Add event listeners
    document.getElementById('addRecipeBtn').addEventListener('click', function() {
        alert('Add recipe functionality coming soon!');
    });
    
    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchRecipes(e.target.value);
    });
    
    document.getElementById('tagSelector').addEventListener('change', function(e) {
        const selectedTag = e.target.value;
        if (selectedTag) {
            filterByTag(selectedTag);
        } else {
            clearFilter();
        }
    });
}

function loadRecipes() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '<p>Loading recipes...</p>';
    
    fetch('data/recipes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load recipes');
            }
            return response.json();
        })
        .then(data => {
            allRecipes = data.recipes || [];
            currentRecipes = [...allRecipes];
            
            console.log(`Loaded ${allRecipes.length} recipes`);
            displayRecipes(currentRecipes);
            populateTagSelector(data.tags || []);
            updateFilterDisplay();
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
            recipeList.innerHTML = `
                <div class="recipe-card">
                    <div class="recipe-title">Error Loading Recipes</div>
                    <p>Could not load recipe data. Please check the console for details.</p>
                </div>
            `;
        });
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    
    // Add filter indicator if there's an active filter
    let filterIndicator = '';
    if (currentFilter) {
        filterIndicator = `
            <div class="filter-indicator">
                <span>Filtering by: <strong>${currentFilter}</strong> (${recipes.length} recipes)</span>
                <button onclick="clearFilter()">Clear Filter</button>
            </div>
        `;
    }
    
    if (recipes.length === 0) {
        recipeList.innerHTML = `
            ${filterIndicator}
            <div class="recipe-card">
                <div class="recipe-title">No Recipes Found</div>
                <p>No recipes match your current search or filter.</p>
                ${currentFilter ? `<button onclick="clearFilter()" style="margin-top: 1rem;">Clear Filter</button>` : ''}
            </div>
        `;
        return;
    }
    
    const recipeCards = recipes.map(recipe => createRecipeCard(recipe)).join('');
    recipeList.innerHTML = filterIndicator + recipeCards;
}

function createRecipeCard(recipe) {
    const date = formatDate(recipe.time_added);
    const hasFavorite = recipe.tags.includes('favorites');
    const tags = recipe.tags.map(tag => {
        const isActive = currentFilter === tag;
        const isFavorite = tag === 'favorites';
        const tagClasses = `tag ${isActive ? 'active' : ''} ${isFavorite ? 'favorite' : ''}`;
        return `<span class="${tagClasses}" onclick="filterByTag('${tag}')">${tag}</span>`;
    }).join('');
    
    const cardClasses = `recipe-card ${hasFavorite ? 'has-favorite' : ''}`;
    
    return `
        <div class="${cardClasses}">
            <div class="recipe-title">
                <a href="${recipe.url}" target="_blank" class="recipe-link">${recipe.title}</a>
            </div>
            <div class="recipe-meta">
                <span class="recipe-source">${recipe.source}</span>
                <span class="recipe-date">Added: ${date}</span>
            </div>
            <div class="recipe-tags">
                ${tags}
            </div>
        </div>
    `;
}

function formatDate(timestamp) {
    if (!timestamp) return 'Unknown date';
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function searchRecipes(query) {
    if (!query.trim()) {
        // If no search query, apply current filter
        if (currentFilter) {
            currentRecipes = allRecipes.filter(recipe => 
                recipe.tags.includes(currentFilter)
            );
        } else {
            currentRecipes = [...allRecipes];
        }
    } else {
        // Apply search within current filter
        const searchTerm = query.toLowerCase();
        let filteredRecipes = allRecipes;
        
        if (currentFilter) {
            filteredRecipes = allRecipes.filter(recipe => 
                recipe.tags.includes(currentFilter)
            );
        }
        
        currentRecipes = filteredRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.source.toLowerCase().includes(searchTerm)
        );
    }
    
    displayRecipes(currentRecipes);
}

function filterByTag(tag) {
    console.log(`Filtering by tag: ${tag}`);
    
    // Toggle filter - if clicking the same tag, clear it
    if (currentFilter === tag) {
        clearFilter();
        return;
    }
    
    currentFilter = tag;
    currentRecipes = allRecipes.filter(recipe => 
        recipe.tags.includes(tag)
    );
    
    // Clear search input when filtering
    document.getElementById('searchInput').value = '';
    
    // Update tag selector to show current filter
    document.getElementById('tagSelector').value = tag;
    
    displayRecipes(currentRecipes);
    updateFilterDisplay();
}

function clearFilter() {
    currentFilter = null;
    currentRecipes = [...allRecipes];
    
    // Clear search input
    document.getElementById('searchInput').value = '';
    
    // Reset tag selector
    document.getElementById('tagSelector').value = '';
    
    displayRecipes(currentRecipes);
    updateFilterDisplay();
}

function updateFilterDisplay() {
    const header = document.querySelector('header p');
    if (currentFilter) {
        const count = currentRecipes.length;
        header.textContent = `Showing ${count} recipes tagged "${currentFilter}"`;
    } else {
        header.textContent = 'Your personal recipe collection';
    }
}

function populateTagSelector(tags) {
    const tagSelector = document.getElementById('tagSelector');
    
    // Clear existing options except "All Tags"
    tagSelector.innerHTML = '<option value="">All Tags</option>';
    
    // Add tag options with counts
    const tagCounts = {};
    allRecipes.forEach(recipe => {
        recipe.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    // Sort tags by count (descending) then alphabetically
    const sortedTags = Object.keys(tagCounts).sort((a, b) => {
        if (tagCounts[b] !== tagCounts[a]) {
            return tagCounts[b] - tagCounts[a];
        }
        return a.localeCompare(b);
    });
    
    sortedTags.forEach(tag => {
        const count = tagCounts[tag];
        const option = document.createElement('option');
        option.value = tag;
        
        // Add special styling for favorites
        if (tag === 'favorites') {
            option.textContent = `★ ${tag} (${count})`;
            option.style.fontWeight = 'bold';
        } else {
            option.textContent = `${tag} (${count})`;
        }
        
        tagSelector.appendChild(option);
    });
} 