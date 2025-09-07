# Recipe Management System - TODO

## Phase 1: Basic Recipe Management ✅ COMPLETE
- [x] Local development setup
- [x] GitHub Pages deployment  
- [x] Basic HTML/CSS/JS structure
- [x] Import 292 recipes from CSV to JSON
- [x] Recipe display functionality
- [x] Search functionality
- [x] Tag filtering
- [x] Add recipe functionality (localStorage)
- [x] Mobile testing and optimization
- [x] Node.js test harness for utility functions
- [x] URL parsing tests integrated into Makefile

**Status**: Live at https://recipes.waltwells.com/ with 292+ recipes successfully imported and functional.

## Phase 2: GitHub Integration for Permanent Storage ⚠️ ON HOLD
- [x] GitHub Issue Form for recipe submission
- [x] GitHub Action parses issues and creates PRs
- [x] Auto-merge for PRs
- [x] Robust ID generation and field extraction
- [x] Improved shell quoting and JSON formatting (partial)

### Outstanding Tasks (Deferred)
- [ ] **Move all JSON and file update logic to Python scripts** (invoked by the action for reliability and testability)
- [ ] Fix JSON formatting to ensure valid output in `recipes.json`
- [ ] Add a validation step to check JSON before commit/push
- [ ] Ensure PR is always created and merged, or provide clear error output
- [ ] Clean up any temp files and ensure only `recipes.json` is updated
- [ ] Add more robust error handling and logging
- [ ] Make all logic easily testable locally (unit tests for Python scripts)
- [ ] Clean up at end - delete issues/branches
- [ ] Update the Issue template so Add Recipe isn't an input

### Lessons Learned
- Shell scripting for JSON is error-prone; quoting and formatting are tricky
- GitHub Actions YAML is sensitive to heredocs and multi-line strings
- Local testing is not always the same as running in GitHub Actions
- Python scripts will make logic more robust and testable
- **Security concerns**: Client-side GitHub integration exposes credentials
- **UX friction**: GitHub mobile app redirects break seamless experience

**Status**: Functional but has reliability issues. Deferred in favor of new repository dispatch approach.

## Phase 2B: Repository Dispatch + PAT Integration 🔄 NEW APPROACH

### Implementation Tasks (HIGH PRIORITY)
- [ ] **Create fine-grained PAT** with minimal permissions (repository dispatch only)
- [ ] **Store PAT as repository secret** for secure access
- [ ] **Implement repository dispatch API calls** in frontend JavaScript
- [ ] **Create GitHub Action workflow** to handle dispatch events and update recipes.json
- [ ] **Add enhanced logging** to GitHub Action for monitoring
- [ ] **Test workflow** with sample recipe additions
- [ ] **Document PAT revocation process** for rapid security response

### Security & Monitoring
- [ ] **PAT scope limitation** - Only repository dispatch permissions
- [ ] **Monitoring via GitHub mobile app** - Action run notifications
- [ ] **Commit history tracking** - Each recipe addition creates clear commit
- [ ] **Rapid revocation strategy** - Document steps to quickly disable PAT if compromised
- [ ] **Recovery procedures** - Git revert process for spam/malicious additions

### User Experience Flow
1. **Mobile recipe addition** → localStorage (immediate feedback)
2. **Background API call** → repository dispatch event
3. **GitHub Action triggered** → updates recipes.json
4. **Commit created** → visible in repo history
5. **Monitoring** → GitHub mobile app shows action completion

**Risk Assessment**: Acceptable risk for personal project with rapid revocation capability and git history recovery.

## Phase 3: UX & Design Enhancement ⚡ CURRENT FOCUS

### 3.1: Add Recipe UX Improvements (HIGH PRIORITY)
- [ ] **URL paste detection** - Auto-open modal when user pastes URL anywhere
- [ ] **Enhanced title extraction** - Fetch page title/metadata automatically
- [ ] **Smart tag suggestions** - Auto-suggest based on URL patterns and existing tags
- [ ] **Recipe preview** - Show fetched title/description before saving
- [ ] **Quick add bar** - Persistent input at top of page for faster entry
- [ ] **Bulk import** - Upload/paste multiple URLs at once
- [ ] **Bookmarklet** - One-click "Add to Recipes" from any webpage
- [ ] **Inline editing** - Add recipes directly in main view without modal

### 3.2: Visual Design Modernization (HIGH PRIORITY)
- [ ] **Card redesign** - Improved visual hierarchy, better spacing
- [ ] **Color scheme refresh** - More vibrant, food-focused palette
- [ ] **Typography improvements** - Better font choices and readability
- [ ] **Recipe thumbnails** - Support for preview images from URLs
- [ ] **Layout enhancements** - Better responsive grid, compact/detailed view toggle
- [ ] **Interactive polish** - Smooth animations, hover effects, transitions
- [ ] **Mobile gestures** - Swipe actions, better touch interactions

### 3.3: User Experience Polish (MEDIUM PRIORITY)
- [ ] **Dark mode toggle** - Better experience in different lighting conditions
- [ ] **Favorites enhancement** - More prominent highlighting and filtering
- [ ] **Export/import functionality** - Bridge localStorage persistence gap
- [ ] **Accessibility improvements** - Better contrast, keyboard navigation
- [ ] **Performance optimizations** - Faster loading, smoother interactions
- [ ] **Search enhancements** - Search in descriptions, better filtering

### 3.4: Advanced Features (FUTURE)
- [ ] Recipe editing functionality
- [ ] Recipe deletion with confirmation
- [ ] Recipe rating system
- [ ] Recipe notes/annotations
- [ ] Recipe sharing functionality
- [ ] Print-friendly recipe view
- [ ] Recipe scaling (servings adjustment)
- [ ] Cooking timer integration
- [ ] Progressive Web App (PWA) features
- [ ] Meal planning calendar
- [ ] Shopping list generation

## Current Priorities & Next Steps

### Immediate Focus (Phase 2B & 3.1)
1. **Repository Dispatch Integration** - Implement seamless GitHub sync for mobile workflow
2. **Add Recipe UX** - Reduce friction in recipe addition workflow  
3. **Visual Design** - Modernize interface for better user experience
4. **User Testing** - Validate improvements with real usage patterns

### Success Metrics
- **Seamless mobile sync** - Add recipe on mobile → automatic GitHub update
- **Faster recipe addition** - Reduce steps from URL to saved recipe
- **Better visual hierarchy** - Easier scanning and recipe discovery
- **Improved mobile experience** - Smoother touch interactions
- **Eliminated data anxiety** - Automatic persistence to GitHub repo

### Implementation Strategy
- **Iterative approach** - Small, testable improvements
- **Mobile-first** - Maintain excellent mobile experience
- **Performance conscious** - Keep fast loading times
- **Backwards compatible** - Don't break existing functionality

## Security Considerations (Documented for Future Reference)

### Client-Side GitHub Integration Issues:
- ❌ **Exposed Credentials**: Personal access tokens visible in client code
- ❌ **Token Security**: Tokens with repo write access are high-risk
- ❌ **Token Management**: Difficult to rotate/revoke tokens
- ❌ **Scope Creep**: Tokens need broad permissions for automation

### Alternative Approaches for Future Consideration:
1. **Manual Export/Import**: Export localStorage data for manual repo updates
2. **OAuth Flow**: Complex, requires backend or serverless function
3. **Serverless Functions**: Adds complexity and hosting requirements
4. **Backend Service**: Defeats purpose of static site simplicity

### Current Approach Benefits:
- ✅ **No Security Risk**: localStorage-only storage eliminates credential exposure
- ✅ **Simple Architecture**: Maintains static site benefits
- ✅ **Fast Performance**: No API calls or external dependencies
- ✅ **Offline Capable**: Works without internet connection
- ✅ **User Control**: Manual export gives users full data control 