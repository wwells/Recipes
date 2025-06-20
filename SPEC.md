# Recipe Management System Specification

## Overview
A self-hosted, mobile-friendly recipe management system to replace Pocket for storing and accessing recipe URLs. Designed for a family cook who needs reliable, long-term access to their recipe collection from anywhere.

## Current State Analysis
- **292 recipes** exported from Pocket
- **Data structure**: `title`, `url`, `time_added`, `tags`, `status`
- **Mixed content**: External URLs + GitHub raw files (images)
- **Tag usage**: Inconsistent tagging (e.g., "food", "recipes", "recipies")
- **Status tracking**: "unread" vs "archive"

## Core Requirements

### 1. Data Management
- **Import existing data**: Seamlessly import 292 recipes from CSV export
- **Store**: Title, URL, timestamp, tags, status
- **Support mixed content**: External URLs + GitHub raw files
- **Data portability**: Easy export/import for future migrations
- **Version control**: Data stored in Git for history and backup

### 2. User Interface
- **Mobile-first design**: Optimized for cooking use on mobile devices
- **Simple navigation**: Browse by tag, date, or search
- **Quick access**: Fast loading, minimal clicks to find recipes
- **Clean display**: Recipe title, source, tags clearly visible
- **Touch-friendly**: Large buttons and easy scrolling

### 3. Functionality
- **Add new recipes**: Simple URL input with optional title/tags
- **Tag management**: Create, edit, filter by tags
- **Search**: Basic text search across titles
- **Status tracking**: Mark as read/unread, archive
- **External links**: Click to open original recipe
- **GitHub integration**: Support for linking to raw GitHub files

### 4. Technical Requirements
- **Free hosting**: GitHub Pages or similar free service
- **Accessible anywhere**: Not limited to home network
- **Portable**: Easy to migrate to different hosting solutions
- **Reliable**: No dependency on third-party services that might shut down
- **Simple maintenance**: Minimal ongoing technical requirements

### 5. Testing Requirements
- **Manual testing**: Core user flows (add, search, filter)
- **Cross-browser testing**: Chrome, Safari, Firefox
- **Mobile testing**: iOS Safari, Android Chrome
- **Data validation**: JSON structure, localStorage integrity
- **Performance testing**: Load time with 292 recipes

## Architecture Decision: Hybrid Approach (Target)

### **Target Architecture: Pure Static + GitHub Integration**
- **Frontend**: Static site with client-side data management
- **Immediate storage**: Browser localStorage for instant feedback
- **Permanent storage**: GitHub repo via manual commits
- **Benefits**: Free, simple, immediate UX, version controlled
- **User flow**: Add recipe → Immediate local storage → Optional GitHub commit

### **User Flow for Adding Recipes (Target)**
1. **User finds recipe** → Clicks "Add Recipe" button
2. **Form appears** → User enters URL, title, tags
3. **Form submission** → JavaScript adds to localStorage immediately
4. **Recipe appears** → Shows in list instantly (pending state)
5. **Background sync** → App offers to commit changes to GitHub
6. **Optional manual sync** → User can also manually commit later

### **Data Flow**
```
Current State:
├── recipes.json (GitHub) - 292 recipes
└── localStorage (browser) - 0 pending

After adding 3 recipes:
├── recipes.json (GitHub) - 292 recipes (unchanged)
└── localStorage (browser) - 3 pending recipes

After syncing:
├── recipes.json (GitHub) - 295 recipes (updated)
└── localStorage (browser) - 0 pending (cleared)
```

## Implementation Phases

### Phase 1: Pure Static Foundation
- [ ] Set up local development environment
- [ ] Set up GitHub Pages repository
- [ ] Create basic HTML/CSS/JS structure
- [ ] Import existing CSV data to JSON format
- [ ] Implement basic recipe display and navigation
- [ ] Add recipe functionality using localStorage only
- [ ] Basic tag management and filtering
- [ ] Mobile optimization
- [ ] Deploy to GitHub Pages

**Phase 1 User Flow:**
- Add recipes → localStorage only
- Browse existing recipes from JSON file
- Manual data management (edit JSON file directly)

### Phase 2: Hybrid GitHub Integration
- [ ] Implement GitHub integration for permanent storage
- [ ] Add "pending changes" indicator
- [ ] Create sync workflow (localStorage ↔ GitHub)
- [ ] Handle conflict resolution
- [ ] Add offline capabilities
- [ ] Batch commit functionality

**Phase 2 User Flow:**
- Add recipes → Immediate localStorage → Optional GitHub commit
- Seamless sync between local and permanent storage
- Works offline with sync when online

### Phase 3: Enhancement
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Performance optimizations
- [ ] GitHub integration for image storage
- [ ] Recipe sharing capabilities

## Repository Structure
```
recipes-app/
├── index.html (main app)
├── data/
│   ├── recipes.json (recipe data)
│   └── tags.json (tag definitions)
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── scripts/
│   └── convert_csv.py
├── README.md
└── .gitignore
```

## Data Structure
```json
{
  "recipes": [
    {
      "id": "unique-id",
      "title": "chocolate peanut butter cake – smitten kitchen",
      "url": "https://smittenkitchen.com/2008/08/chocolate-peanut-butter-cake/",
      "time_added": 1596838918,
      "tags": ["dessert", "chocolate"],
      "status": "unread",
      "source": "smittenkitchen.com"
    }
  ],
  "tags": ["dessert", "main-dish", "appetizer", "beverage"]
}
```

## Alternative Architectures (Rejected)

### Option A: GitHub Pages + Serverless Backend
- **Pros**: Seamless UX, real-time updates
- **Cons**: More complex, potential costs, security considerations
- **Decision**: Too complex for initial implementation

### Option C: Self-hosted
- **Pros**: Full control, no external dependencies
- **Cons**: Requires home network access, more maintenance
- **Decision**: Doesn't meet "accessible anywhere" requirement

## Open Questions

1. **Tag strategy**: Should we clean up existing tags (fix "recipies" typo, standardize categories)?

2. **Search scope**: Just titles, or also include source domains?

3. **Sorting preferences**: Default sort by date added, or alphabetical by title?

4. **GitHub integration**: Should the app be able to add new images to repo, or just link to existing ones?

5. **Authentication**: Do you need any access control, or is this just for personal use?

## Success Criteria
- [ ] Successfully import all 292 existing recipes
- [ ] Mobile-friendly interface for cooking use
- [ ] Fast recipe lookup and filtering
- [ ] Reliable access from anywhere
- [ ] Easy to maintain and migrate
- [ ] No ongoing costs
- [ ] No dependency on third-party services
- [ ] Immediate feedback when adding recipes (Phase 1)
- [ ] Seamless sync with GitHub (Phase 2)

## Next Steps
1. Set up local development environment
2. Set up GitHub Pages repository
3. Create basic HTML/CSS/JS structure
4. Build CSV-to-JSON import script
5. Implement Phase 1 functionality
6. Test with real data and usage patterns
7. Iterate based on feedback 