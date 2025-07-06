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

## Phase 2: GitHub Integration for Permanent Storage ✅ COMPLETE
**Approach: GitHub Issue Form + GitHub Actions Workflow**

### Security-Conscious Solution Implemented:
- [x] GitHub Issue Form template for mobile-friendly recipe submission
- [x] GitHub Action that automatically creates PRs from issue submissions
- [x] Auto-merge workflow to update recipes.json
- [x] No client-side GitHub credentials required
- [x] Mobile-optimized workflow using GitHub's native features

### Files Created:
- [x] `.github/ISSUE_TEMPLATE/add-recipe.yml` - Mobile-friendly form
- [x] `.github/workflows/add-recipe.yml` - Automated PR creation and merge
- [x] `scripts/test_issue_form.py` - Local testing utility

### How It Works:
1. **Mobile Submission**: Use GitHub mobile app to create issue with recipe form
2. **Auto-PR**: GitHub Action creates pull request with recipe data
3. **Auto-Merge**: PR automatically merges to update recipes.json
4. **Deployment**: GitHub Pages automatically deploys updated site

### Benefits:
- ✅ **Secure**: No credentials in client-side code
- ✅ **Simple**: Uses GitHub's native features
- ✅ **Mobile-friendly**: Works with GitHub mobile app
- ✅ **Automated**: No manual git operations needed
- ✅ **Auditable**: Full history in GitHub issues and PRs

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