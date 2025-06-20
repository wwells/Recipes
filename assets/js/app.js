// Basic app functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Recipe Manager loaded');
    
    // Initialize the app
    initApp();
});

function initApp() {
    // For now, just show a placeholder
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = `
        <div class="recipe-card">
            <div class="recipe-title">Recipe Manager is Ready!</div>
            <p>Your recipe collection will appear here once we load the data.</p>
            <div class="recipe-tags">
                <span class="tag">coming soon</span>
            </div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('addRecipeBtn').addEventListener('click', function() {
        alert('Add recipe functionality coming soon!');
    });
    
    document.getElementById('searchInput').addEventListener('input', function(e) {
        console.log('Searching for:', e.target.value);
    });
} 