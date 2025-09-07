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

## Phase 2: GitHub Integration for Permanent Storage (In Progress)
- [x] GitHub Issue Form for recipe submission
- [x] GitHub Action parses issues and creates PRs
- [x] Auto-merge for PRs
- [x] Robust ID generation and field extraction
- [x] Improved shell quoting and JSON formatting (in progress)

### Outstanding Tasks
- [ ] **Move all JSON and file update logic to Python scripts** (invoked by the action for reliability and testability)
- [ ] Fix JSON formatting to ensure valid output in `recipes.json`
- [ ] Add a validation step to check JSON before commit/push
- [ ] Ensure PR is always created and merged, or provide clear error output
- [ ] Clean up any temp files and ensure only `recipes.json` is updated
- [ ] Add more robust error handling and logging
- [ ] Make all logic easily testable locally (unit tests for Python scripts)
- [ ] Clean up at end - delete issues/branches
- [ ] Update the Issue template so Add Recipie isn't an input. 

### Lessons Learned
- Shell scripting for JSON is error-prone; quoting and formatting are tricky
- GitHub Actions YAML is sensitive to heredocs and multi-line strings
- Local testing is not always the same as running in GitHub Actions
- Python scripts will make logic more robust and testable

## Phase 3: Enhanced Features (Future)
### Recipe Management
- [ ] Recipe editing functionality
- [ ] Recipe deletion with confirmation
- [ ] Recipe rating system
- [ ] Recipe notes/annotations
- [ ] Recipe image upload support
- [ ] Recipe import from other formats (PDF, etc.)

### User Experience
- [ ] Dark mode toggle
- [ ] Recipe favorites system
- [ ] Recipe sharing functionality
- [ ] Print-friendly recipe view
- [ ] Recipe scaling (servings adjustment)
- [ ] Cooking timer integration
- [ ] Recipe history/timeline

### Advanced Features
- [ ] Recipe recommendations based on tags
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Nutritional information integration
- [ ] Recipe difficulty ratings
- [ ] Cooking time estimates
- [ ] Ingredient substitution suggestions

### Technical Improvements
- [ ] Progressive Web App (PWA) features
- [ ] Offline recipe access
- [ ] Recipe backup/export functionality
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Internationalization support

## Security Considerations (Documented)
### Client-Side GitHub Integration Issues:
- ❌ **Exposed Credentials**: Personal access tokens visible in client code
- ❌ **Token Security**: Tokens with repo write access are high-risk
- ❌ **Token Management**: Difficult to rotate/revoke tokens
- ❌ **Scope Creep**: Tokens need broad permissions for automation

### Alternative Approaches Considered:
1. **Manual Sync**: Export localStorage data, manually update repo
2. **OAuth Flow**: Complex, requires backend or serverless function
3. **Serverless Functions**: Adds complexity and hosting requirements
4. **Backend Service**: Defeats purpose of static site simplicity

### Current Solution Benefits:
- ✅ **No Credentials**: Uses GitHub's built-in issue/PR system
- ✅ **Native Integration**: Leverages GitHub's existing features
- ✅ **Mobile Optimized**: Works seamlessly with GitHub mobile app
- ✅ **Audit Trail**: Full history in issues and PRs
- ✅ **Simple Hosting**: Maintains static site simplicity 