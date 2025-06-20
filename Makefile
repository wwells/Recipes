.PHONY: dev test clean import-data setup open

# Start local development server (requires Python)
dev:
	@echo "Starting local development server..."
	@echo "If you have Python installed: python -m http.server 8000"
	@echo "If you have Node.js installed: npx live-server"
	@echo "Alternative: Open index.html directly in your browser"
	@echo "Or use VS Code Live Server extension"
	@echo ""
	@echo "For now, try: make open"

# Open Using VS Code Live Server Extension
open:
	@echo "Opening index.html in VS Code Live Server..."
	code index.html

# Run tests (placeholder for now)
test:
	@echo "Running tests..."
	@echo "No tests configured yet"

# Clean up temporary files
clean:
	@echo "Cleaning up..."
	rm -rf __pycache__/
	rm -rf .pytest_cache/
	find . -name "*.pyc" -delete

# Import CSV data to JSON
import-data:
	@echo "Converting CSV to JSON..."
	@echo "Note: Requires Python. Run manually: python scripts/convert_csv.py"

# Setup development environment
setup:
	@echo "Setting up development environment..."
	@echo "Creating directories..."
	mkdir -p assets/css assets/js data scripts
	@echo "Setup complete!"

# Help
help:
	@echo "Available commands:"
	@echo "  make open       - Open index.html in browser (no server needed)"
	@echo "  make dev        - Show server options (requires Python/Node.js)"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean up temporary files"
	@echo "  make import-data - Convert CSV to JSON (requires Python)"
	@echo "  make setup      - Setup development environment"
	@echo "  make help       - Show this help"
	@echo ""
	@echo "Local Development Options:"
	@echo "  1. make open    - Simplest (opens file directly)"
	@echo "  2. VS Code Live Server extension"
	@echo "  3. Install Python: python -m http.server 8000"
	@echo "  4. Install Node.js: npx live-server" 