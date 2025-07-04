# Recipe Management System Specification

## Overview
A self-hosted, mobile-friendly recipe management system to replace Pocket for storing and accessing recipe URLs. Designed for a family cook who needs reliable, long-term access to their recipe collection from anywhere.

## Current State Analysis (Updated June 2025)
- **292 recipes** successfully imported from Pocket CSV export
- **Live deployment**: https://recipes.waltwells.com/ (GitHub Pages)
- **Mobile tested**: Verified working on mobile devices
- **Core functionality**: Recipe display, search, filtering, add new recipes (localStorage)
- **Data structure**: `title`, `url`, `time_added`, `tags`, `source`
- **Current limitation**: New recipes only stored in localStorage (not permanent)

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

### Phase 1: Pure Static Foundation ✅ COMPLETE
- [x] Set up local development environment
- [x] Set up GitHub Pages repository
- [x] Create basic HTML/CSS/JS structure
- [x] Import existing CSV data to JSON format
- [x] Implement basic recipe display and navigation
- [x] Add recipe functionality using localStorage only
- [x] Basic tag management and filtering
- [x] Mobile optimization
- [x] Deploy to GitHub Pages

**Phase 1 Status: COMPLETE** ✅
- Site live at: https://recipes.waltwells.com/
- All 292 recipes loading and searchable
- Add recipe functionality working (localStorage)
- Mobile interface tested and working
- Ready for Phase 2 development

### Phase 2: Hybrid GitHub Integration ⚠️ SECURITY CONCERNS
- [ ] **ON HOLD**: Implement GitHub integration for permanent storage
- [ ] **ON HOLD**: Add "pending changes" indicator
- [ ] **ON HOLD**: Create sync workflow (localStorage ↔ GitHub)
- [ ] **ON HOLD**: Handle conflict resolution
- [ ] **ON HOLD**: Add offline capabilities
- [ ] **ON HOLD**: Batch commit functionality

**⚠️ CRITICAL SECURITY ISSUE IDENTIFIED:**
All proposed client-side GitHub integration approaches expose credentials in public static site, allowing malicious users to commit unwanted recipes to the repository.

**Phase 2 User Flow (ON HOLD):**
- Add recipes → Immediate localStorage → Optional GitHub commit
- Seamless sync between local and permanent storage
- Works offline with sync when online

**STATUS**: Architecture needs fundamental reconsideration to address security concerns.

### Phase 3: Enhancement
- [ ] Improve site design/layout:  Personalize
- [ ] Advanced search and filtering
- [ ] Auth?
- [ ] Add support for editing Recipes in the browser
- [ ] Performance optimizations
- [ ] GitHub integration for image storage
- [ ] Recipe sharing capabilities?

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
- **Pros**: Seamless UX, real-time updates, **SECURE** (credentials server-side)
- **Cons**: More complex, potential costs
- **Decision**: Too complex for initial implementation, but **SECURITY CONCERN** may require reconsideration

### Option C: Self-hosted
- **Pros**: Full control, no external dependencies
- **Cons**: Requires home network access, more maintenance
- **Decision**: Doesn't meet "accessible anywhere" requirement

## ⚠️ SECURITY ARCHITECTURE CONCERNS

**Current Static Site Limitation**: Any client-side GitHub integration exposes credentials to all users, creating security vulnerabilities.

**Potential Solutions to Reconsider**:
1. **Serverless Functions**: Netlify/Vercel functions for secure GitHub API calls
2. **Backend Service**: Simple authenticated API backend
3. **GitHub Actions**: Automated commits via webhooks
4. **Hybrid Approach**: Static frontend + secure API backend

## Open Questions

1. **Tag strategy**: Should we clean up existing tags (fix "recipies" typo, standardize categories)?

2. **Search scope**: Just titles, or also include source domains?

3. **Sorting preferences**: Default sort by date added, or alphabetical by title?

4. **GitHub integration**: Should the app be able to add new images to repo, or just link to existing ones?

5. **Authentication**: Do you need any access control, or is this just for personal use?

6. **⚠️ CRITICAL**: How to implement secure GitHub integration without exposing credentials in client-side code?

7. **Architecture**: Should we move away from pure static site approach to address security concerns?

8. **Trade-offs**: What's the acceptable balance between UX convenience and security requirements?

## Success Criteria
- [x] Successfully import all 292 existing recipes
- [x] Mobile-friendly interface for cooking use
- [x] Fast recipe lookup and filtering
- [x] Reliable access from anywhere
- [x] Easy to maintain and migrate
- [x] No ongoing costs
- [x] No dependency on third-party services
- [x] Immediate feedback when adding recipes (Phase 1)
- [ ] Seamless sync with GitHub (Phase 2)

## Next Steps (Updated June 2024)
1. ✅ **Phase 1 Complete** - Basic functionality deployed and working
2. ⚠️ **Phase 2 ON HOLD** - Security concerns require architecture reconsideration
3. 🔄 **Security Analysis** - Evaluate alternative approaches for secure GitHub integration
4. 🔄 **Architecture Decision** - Choose between enhanced static site vs server-side approach
5. 🔄 **Revise Phase 2 Plan** - Update goals based on security requirements
6. 🔄 **Phase 3 Planning** - Consider additional enhancements (after security resolved)

## Development & Testing Workflow (2024-06)
- **Development tasks** (setup, test, dev server, clean) are managed via a Makefile, not npm scripts.
- **Testing**: Node.js is required for running command-line tests (`make test`).
- **Local server**: Python's built-in HTTP server is used for local development (`make dev`).
- **Test harness**: A simple Node.js-based test runner is in place for utility functions (see `tests/run_tests.js`).
- **No npm scripts**: All project automation is handled via Makefile for simplicity and portability. 