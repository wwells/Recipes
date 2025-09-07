# Recipe Management System Specification

## Overview
A self-hosted, mobile-friendly recipe management system to replace Pocket for storing and accessing recipe URLs. Designed for a family cook who needs reliable, long-term access to their recipe collection from anywhere.

## Current State Analysis (Updated January 2025)
- **292+ recipes** successfully imported from Pocket CSV export
- **Live deployment**: https://recipes.waltwells.com/ (GitHub Pages)
- **Mobile tested**: Verified working on mobile devices
- **Core functionality**: Recipe display, search, filtering, add new recipes (localStorage)
- **Data structure**: `title`, `url`, `time_added`, `tags`, `source`
- **Current limitation**: New recipes only stored in localStorage (not permanent)
- **User feedback**: After living with the app, identified opportunities for UX and visual improvements

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

### Phase 2: GitHub Integration Approaches

#### 2A: GitHub Issues + Actions ⚠️ ON HOLD
- [x] GitHub Issue Form for recipe submission
- [x] GitHub Action parses issues and creates PRs
- [x] Auto-merge for PRs
- [x] Robust ID generation and field extraction
- [ ] **ON HOLD**: Fix reliability issues with JSON formatting and mobile UX

**Status**: Functional but unreliable. Mobile UX is clunky due to GitHub app redirects.

#### 2B: Repository Dispatch + PAT 🔄 NEW APPROACH
- [ ] **PLANNED**: Direct API integration using repository dispatch events
- [ ] **PLANNED**: Fine-grained PAT with minimal permissions (Actions: write only)
- [ ] **PLANNED**: GitHub Action triggered by dispatch events
- [ ] **PLANNED**: Enhanced monitoring via GitHub Actions logs and mobile app
- [ ] **PLANNED**: Rapid PAT revocation strategy for security incidents

**Security Model:**
- **Risk Acceptance**: Limited scope PAT with repository-only access
- **Risk Mitigation**: Rapid revocation capability, git history for recovery
- **Monitoring**: GitHub Actions logs, mobile app notifications, commit history

**Phase 2B User Flow (PLANNED):**
- Add recipes → Immediate localStorage → Automatic GitHub dispatch → Action updates repo
- Seamless mobile experience with immediate feedback
- Background sync with monitoring via GitHub mobile app

### Phase 3: UX & Design Enhancement ⚡ CURRENT FOCUS
After living with the app, identified key areas for improvement based on real usage patterns.

#### 3.1: Add Recipe UX Improvements
- [ ] **Enhanced input methods**: URL paste detection, bookmarklet, bulk import
- [ ] **Better title extraction**: Auto-parse page titles and metadata
- [ ] **Smart tagging**: Auto-suggest tags based on URL patterns and content
- [ ] **Recipe preview**: Show fetched title/description before saving
- [ ] **Inline editing**: Add recipes directly in main view without modal
- [ ] **Quick add bar**: Persistent input for faster recipe entry

#### 3.2: Visual Design Modernization
- [ ] **Card redesign**: Improved visual hierarchy and spacing
- [ ] **Color scheme refresh**: More vibrant, food-focused palette
- [ ] **Typography improvements**: Better font choices and readability
- [ ] **Layout enhancements**: Better responsive grid, compact/detailed views
- [ ] **CSS / Family Images**:  Add nice backgrounds / family images

#### 3.3: User Experience Polish
- [ ] **Dark mode toggle**: Better experience in different lighting
- [ ] **Favorites enhancement**: More prominent highlighting of favorite recipes
- [ ] **Mobile gestures**: Swipe actions, pull-to-refresh
- [ ] **Accessibility improvements**: Better contrast, keyboard navigation
- [ ] **Performance optimizations**: Faster loading, smoother interactions

#### 3.4: Advanced Features (Future)
- [ ] Advanced search and filtering
- [ ] Recipe editing in browser
- [ ] GitHub integration for image storage
- [ ] Recipe sharing capabilities
- [ ] Meal planning features

## GitHub Issue/PR Workflow (Phase 2+)

### Current Design
- Users submit new recipes via a GitHub Issue Form (mobile-friendly, no secrets required)
- A GitHub Action parses the issue, generates a new recipe entry, and attempts to create a PR to update `data/recipes.json`
- The PR is auto-merged if successful, triggering a GitHub Pages deployment

### Security & Simplicity
- No client-side secrets or tokens
- All automation is handled by GitHub Actions
- Full audit trail via issues and PRs

### Known Issues / Limitations
- Shell scripting for JSON is error-prone; quoting and formatting are tricky
- The workflow sometimes produces invalid JSON, causing PRs to fail or not merge
- The action runs on issue creation, but PR creation/merge may silently fail if errors occur
- Local testing is not always the same as GitHub Actions environment

### Lessons Learned
- Shell scripting for JSON manipulation is fragile and hard to test
- GitHub Actions YAML is sensitive to heredocs and multi-line strings
- Robust error handling and validation are essential

### Next Steps / Open Questions
- Move JSON generation and file update logic to Python scripts (invoked by the action)
- Add validation steps to check JSON validity before commit/push
- Improve error handling and logging in the workflow
- Ensure only `data/recipes.json` is updated (no temp files left behind)
- Make all logic easily testable locally

## Options for Submitting a PR from a Static Site

### 1. Manual PR via GitHub UI (Current Approach)
- User copies recipe data and submits a PR or issue via GitHub web/mobile UI.
- No secrets exposed, but not seamless.

### 2. GitHub OAuth Flow (Web Application Flow)
- User clicks “Submit to GitHub” in the static site.
- Redirects to GitHub for OAuth authorization.
- App receives a temporary token to create a PR.
- Requires registering a GitHub OAuth app and a backend to handle the secret exchange.
- Secure, but adds backend complexity.

### 3. Serverless Function/Backend Proxy
- Static site sends recipe data to a serverless function (e.g., AWS Lambda, Vercel, Cloudflare Workers).
- The function (holding the PAT securely) creates the PR on GitHub.
- Secret is never exposed to the browser.
- Secure and common for JAMstack sites.

### 4. GitHub Apps (Advanced)
- Create a GitHub App with fine-grained permissions.
- Users install the app on their repo.
- Static site interacts with the app via a backend or serverless function.
- More complex, but secure and flexible.

### What Not to Do
- Never embed a PAT or any write-access token in your static site’s JS. This is a major security risk.

### Summary Table
| Approach                | Secure? | Seamless? | Requires Backend? | Recommended?         |
|-------------------------|---------|-----------|-------------------|----------------------|
| Manual PR/Issue         | ✅      | ❌        | No                | Yes (for simplicity) |
| PAT in JS               | ❌      | ✅        | No                | Never!               |
| OAuth Flow              | ✅      | ✅        | Yes               | Yes (if you want seamless UX) |
| Serverless Proxy        | ✅      | ✅        | Yes               | Yes                  |
| GitHub App              | ✅      | ✅        | Yes               | Advanced             |

## UX Limitation: GitHub Mobile App and Issue Templates
- When using a custom issue template, the GitHub mobile app redirects to the browser for submission (breaking the in-app experience).
- Un-templated issues can be submitted in-app, but lack structure and validation.
- This makes the current workflow (issue form + action) too cumbersome for quick mobile recipe entry.

## Conclusion
- The current GitHub Issue/PR workflow is secure but not seamless on mobile due to GitHub app limitations.
- For a truly seamless experience, consider an OAuth or serverless approach, or explore other mobile-friendly solutions.

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

## User Experience Insights (After Living with the App)

### What's Working Well
- **Fast recipe lookup**: Search and filtering work smoothly
- **Mobile experience**: Good touch targets and responsive design
- **Simple interface**: Easy to understand and navigate
- **Reliable hosting**: GitHub Pages provides consistent access

### Pain Points Identified
- **Add recipe friction**: Modal workflow feels heavy for quick additions
- **Visual hierarchy**: Recipe cards could be more scannable and engaging
- **Limited persistence**: localStorage-only storage creates anxiety about data loss
- **Title extraction**: Manual title entry is tedious for most recipes
- **Tag management**: No auto-suggestions or smart categorization

### Opportunities for Enhancement
- **Streamlined input**: Faster ways to add recipes (paste detection, bookmarklet)
- **Visual polish**: More modern, food-focused design aesthetic
- **Smart features**: Auto-title extraction, tag suggestions, recipe previews
- **Better persistence**: Export/import workflows to bridge localStorage gap

## Open Questions

1. **Tag strategy**: Should we clean up existing tags (fix "recipies" typo, standardize categories)?

2. **Search scope**: Just titles, or also include source domains?

3. **Sorting preferences**: Default sort by date added, or alphabetical by title?

4. **Visual direction**: Prefer minimal/clean or rich/colorful food-focused design?

5. **Add recipe priority**: Focus on speed/convenience or rich preview/metadata?

6. **Persistence approach**: Manual export/import vs revisiting automated GitHub integration?

7. **Mobile vs desktop**: Should mobile-first design be maintained or add desktop-specific features?

8. **⚠️ DEFERRED**: How to implement secure GitHub integration without exposing credentials in client-side code?

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

## Next Steps (Updated January 2025)
1. ✅ **Phase 1 Complete** - Basic functionality deployed and working
2. 🔄 **Phase 2B PLANNED** - Repository Dispatch + PAT approach for GitHub integration
3. ⚡ **Phase 3 IN PROGRESS** - UX & Design Enhancement based on real usage
4. 🔄 **Phase 2B Priority** - Implement and test repository dispatch workflow
5. 🔄 **Phase 3.1 Priority** - Improve add recipe functionality and user experience
6. 🔄 **Phase 3.2 Priority** - Modernize visual design and interface polish

## Development & Testing Workflow (2024-06)
- **Development tasks** (setup, test, dev server, clean) are managed via a Makefile, not npm scripts.
- **Testing**: Node.js is required for running command-line tests (`make test`).
- **Local server**: Python's built-in HTTP server is used for local development (`make dev`).
- **Test harness**: A simple Node.js-based test runner is in place for utility functions (see `tests/run_tests.js`).
- **No npm scripts**: All project automation is handled via Makefile for simplicity and portability. 