.PHONY: dev test clean help

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

# Help
help:
	@echo "Available commands:"
	@echo "  make dev        - Show server options (requires Python)"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean up temporary files"
	@echo "  make help       - Show this help"
