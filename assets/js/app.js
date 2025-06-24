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
    // Load recipes from JSON file and localStorage
    loadRecipes();
    
    // Add event listeners
    document.getElementById('addRecipeBtn').addEventListener('click', function() {
        openAddRecipeModal();
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
    
    // Modal event listeners
    document.querySelector('.close').addEventListener('click', closeAddRecipeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeAddRecipeModal);
    document.getElementById('addRecipeForm').addEventListener('submit', handleAddRecipe);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('addRecipeModal');
        if (event.target === modal) {
            closeAddRecipeModal();
        }
    });
}

function loadRecipes() {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '<p>Loading recipes...</p>';
    
    fetch('data/recipes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load recipes: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allRecipes = data.recipes || [];
            
            // Load recipes from localStorage
            const localRecipes = loadFromLocalStorage();
            allRecipes = [...allRecipes, ...localRecipes];
            
            currentRecipes = [...allRecipes];
            
            console.log(`Loaded ${allRecipes.length} recipes (${data.recipes.length} from JSON, ${localRecipes.length} from localStorage)`);
            displayRecipes(currentRecipes);
            populateTagSelector(data.tags || []);
            updateFilterDisplay();
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
            recipeList.innerHTML = `
                <div class="recipe-card">
                    <div class="recipe-title">Error Loading Recipes</div>
                    <p>Could not load recipe data: ${error.message}</p>
                    <p>Please check the console for details.</p>
                </div>
            `;
        });
}

function loadFromLocalStorage() {
    try {
        const stored = localStorage.getItem('recipeManager_localRecipes');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
}

function saveToLocalStorage(recipes) {
    try {
        localStorage.setItem('recipeManager_localRecipes', JSON.stringify(recipes));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function openAddRecipeModal() {
    document.getElementById('addRecipeModal').style.display = 'block';
    document.getElementById('recipeUrl').focus();
}

function closeAddRecipeModal() {
    document.getElementById('addRecipeModal').style.display = 'none';
    document.getElementById('addRecipeForm').reset();
}

function handleAddRecipe(event) {
    event.preventDefault();
    
    const url = document.getElementById('recipeUrl').value.trim();
    const title = document.getElementById('recipeTitle').value.trim();
    const tagsInput = document.getElementById('recipeTags').value.trim();
    
    // Validate URL
    if (!url) {
        alert('Please enter a recipe URL');
        return;
    }
    
    // Parse tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    // Create new recipe
    const newRecipe = {
        id: `local_${Date.now()}`,
        title: title || extractTitleFromUrl(url),
        url: url,
        time_added: Math.floor(Date.now() / 1000),
        tags: tags,
        source: extractSource(url),
        isLocal: true
    };
    
    // Add to localStorage
    const localRecipes = loadFromLocalStorage();
    localRecipes.push(newRecipe);
    saveToLocalStorage(localRecipes);
    
    // Add to current recipes and display
    allRecipes.push(newRecipe);
    currentRecipes = [...allRecipes];
    displayRecipes(currentRecipes);
    
    // Update tag selector
    updateTagSelectorWithNewTags(tags);
    
    // Close modal and show success
    closeAddRecipeModal();
    
    // Show success message
    showSuccessMessage(`Added "${newRecipe.title}" to your recipe collection!`);
}

function extractTitleFromUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        return `Recipe from ${hostname}`;
    } catch {
        return 'Untitled Recipe';
    }
}

function extractSource(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return 'unknown';
    }
}

function updateTagSelectorWithNewTags(newTags) {
    const tagSelector = document.getElementById('tagSelector');
    const existingTags = Array.from(tagSelector.options).map(option => option.value);
    
    newTags.forEach(tag => {
        if (!existingTags.includes(tag)) {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = `${tag} (1)`;
            tagSelector.appendChild(option);
        }
    });
}

function showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1001;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
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