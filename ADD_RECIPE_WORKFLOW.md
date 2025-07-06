# Adding Recipes via GitHub Mobile

This guide explains how to add new recipes to your collection using only the GitHub mobile app.

## Quick Start

1. **Open GitHub Mobile App** on your phone
2. **Navigate to your repository**: `https://github.com/yourusername/Recipes`
3. **Tap "Issues"** tab
4. **Tap "New Issue"**
5. **Select "Add New Recipe"** template
6. **Fill out the form** with recipe details
7. **Submit the issue**

That's it! The recipe will automatically be added to your collection.

## Detailed Steps

### Step 1: Access Your Repository
- Open GitHub mobile app
- Search for your repository or navigate to it
- Make sure you're on the main branch

### Step 2: Create New Issue
- Tap the **"Issues"** tab at the top
- Tap the **"New Issue"** button
- You'll see a template selector - choose **"Add New Recipe"**

### Step 3: Fill Out the Form
The form includes these fields:

- **Recipe Title**: The name of the recipe (required)
- **Recipe URL**: Where you found the recipe (required)
- **Recipe Tags**: Select from predefined categories (required)
- **Custom Tags**: Add any additional tags (optional)
- **Source Website**: The website name (required)
- **Notes**: Any modifications or notes (optional)

### Step 4: Submit
- Review your entries
- Tap **"Submit new issue"**

## What Happens Next

1. **Automatic PR Creation**: A GitHub Action creates a pull request with your recipe
2. **Auto-Merge**: The PR automatically merges into the main branch
3. **Site Update**: GitHub Pages automatically deploys the updated site
4. **Recipe Available**: Your recipe appears on https://recipes.waltwells.com/

## Available Tags

### Predefined Tags:
- `breakfast` - Morning meals
- `main-dishes` - Primary dinner/lunch dishes
- `sides` - Side dishes and accompaniments
- `soups` - Soups and stews
- `desserts` - Sweet treats
- `breads` - Breads and baked goods
- `favorites` - Your go-to recipes
- `quick` - Fast recipes (30 min or less)
- `vegetarian` - No meat
- `vegan` - No animal products
- `gluten-free` - No gluten
- `dairy-free` - No dairy

### Custom Tags:
You can add any additional tags separated by commas, such as:
- `italian`, `pasta`, `comfort-food`
- `spicy`, `asian`, `stir-fry`
- `slow-cooker`, `instant-pot`, `air-fryer`

## Tips for Mobile Use

### Efficient Tagging:
- Use the predefined tags when possible
- Add custom tags for specific cuisines or cooking methods
- Keep tags simple and consistent

### URL Handling:
- Copy the recipe URL from your browser
- Paste it directly into the form
- Make sure it's the full URL

### Notes Section:
- Use this for modifications you made
- Note any substitutions or adjustments
- Include cooking tips or serving suggestions

## Troubleshooting

### Issue Not Creating PR:
- Check that you selected the "Add New Recipe" template
- Ensure all required fields are filled
- Wait a few minutes for the GitHub Action to run

### Recipe Not Appearing:
- Check the GitHub Actions tab for any errors
- Verify the PR was created and merged
- Wait for GitHub Pages to redeploy (usually 1-2 minutes)

### Form Issues:
- Make sure you're using the latest GitHub mobile app
- Try refreshing the page if the form doesn't load
- Check your internet connection

## Benefits of This Approach

✅ **Secure**: No credentials stored in your browser
✅ **Mobile-Friendly**: Works perfectly on phones
✅ **Auditable**: Full history in GitHub issues and PRs
✅ **Simple**: No git commands or technical knowledge needed
✅ **Automated**: Everything happens automatically
✅ **Reliable**: Uses GitHub's robust infrastructure

## Example

Here's what a completed form might look like:

**Recipe Title**: Chocolate Chip Cookies
**Recipe URL**: https://smittenkitchen.com/2008/08/chocolate-chip-cookies/
**Recipe Tags**: desserts, favorites
**Custom Tags**: cookies, chocolate
**Source Website**: smittenkitchen.com
**Notes**: I use dark chocolate chips and add a pinch of sea salt on top

This would create a recipe with tags: `["desserts", "favorites", "cookies", "chocolate"]` 