# Recipe Manager Makefile

.PHONY: help setup test test-browser dev clean

# Default target
help:
	@echo "Recipe Manager - Available commands:"
	@echo "  setup      - Install Node.js dependencies"
	@echo "  test       - Run tests with Node.js"
	@echo "  test-browser - Run tests in browser"
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
