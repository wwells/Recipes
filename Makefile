.PHONY: dev test clean import-data setup open

# Start local development server (requires Python)
dev:
	@echo "Starting local development server..."
	python3 -m http.server 8000

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
	python3 scripts/convert_csv.py

# Setup development environment
setup:
	@echo "Setting up development environment..."
	@echo "Creating directories..."
	mkdir -p assets/css assets/js data scripts
	@echo "Setup complete!"

# Help
help:
	@echo "Available commands:"
	@echo "  make dev        - Show server options (requires Python)"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean up temporary files"
	@echo "  make import-data - Convert CSV to JSON (requires Python)"
	@echo "  make setup      - Setup development environment"
	@echo "  make help       - Show this help"
