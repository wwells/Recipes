# Recipe Manager Makefile

.PHONY: help setup test test-browser dev clean test-workflow

# Default target
help:
	@echo "Recipe Manager - Available commands:"
	@echo "  setup      - Install Node.js dependencies"
	@echo "  test       - Run tests with Node.js"
	@echo "  test-browser - Run tests in browser"
	@echo "  test-workflow - Test GitHub issue form workflow"
	@echo "  validate-yaml - Validate YAML syntax"
	@echo "  dev        - Start development server"
	@echo "  clean      - Clean up generated files"

# Install dependencies
setup:
	@echo "Installing Node.js dependencies..."
	npm install
	@echo "✅ Setup complete!"

# Run tests with Node.js
test:
	@echo "Running tests with Node.js..."
	node tests/run_tests.js

# Run tests in browser
test-browser:
	@echo "Starting test server..."
	@echo "Open http://localhost:8000/tests/run_tests.html in your browser"
	python3 -m http.server 8000

# Start development server
dev:
	@echo "Starting development server..."
	@echo "Open http://localhost:8000 in your browser"
	python3 -m http.server 8000

# Clean up generated files
clean:
	@echo "Cleaning up..."
	rm -rf node_modules
	rm -f package-lock.json
	@echo "✅ Clean complete!"

# Test GitHub workflow locally
test-workflow:
	@echo "Testing GitHub issue form workflow..."
	@echo "Creating sample issue body..."
	@mkdir -p tests
	@echo "### Recipe Title" > tests/sample_issue.txt
	@echo "Chocolate Chip Cookies" >> tests/sample_issue.txt
	@echo "" >> tests/sample_issue.txt
	@echo "### Recipe URL" >> tests/sample_issue.txt
	@echo "https://smittenkitchen.com/2008/08/chocolate-chip-cookies/" >> tests/sample_issue.txt
	@echo "" >> tests/sample_issue.txt
	@echo "### Recipe Tags" >> tests/sample_issue.txt
	@echo "desserts, favorites" >> tests/sample_issue.txt
	@echo "" >> tests/sample_issue.txt
	@echo "### Custom Tags" >> tests/sample_issue.txt
	@echo "cookies, chocolate" >> tests/sample_issue.txt
	@echo "" >> tests/sample_issue.txt
	@echo "### Notes" >> tests/sample_issue.txt
	@echo "I use dark chocolate chips and add a pinch of sea salt on top" >> tests/sample_issue.txt
	@echo "Running test script..."
	python3 scripts/test_issue_form.py tests/sample_issue.txt
	@echo "✅ Workflow test complete!"

# Validate YAML syntax
validate-yaml:
	@echo "Validating YAML files..."
	python3 scripts/validate_yaml.py .github/workflows/add-recipe.yml
	python3 scripts/validate_yaml.py .github/ISSUE_TEMPLATE/add-recipe.yml
	@echo "✅ YAML validation complete!"
