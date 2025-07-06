#!/usr/bin/env python3
"""
Test script to simulate GitHub issue form data extraction.
This helps debug the workflow locally before deploying.
"""

import json
import sys
import re
from datetime import datetime

def extract_issue_data(issue_body):
    """Extract recipe data from GitHub issue form body."""
    lines = issue_body.split('\n')
    data = {}
    current_field = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check for field headers
        if line.startswith('### Recipe Title'):
            current_field = 'title'
        elif line.startswith('### Recipe URL'):
            current_field = 'url'
        elif line.startswith('### Recipe Tags'):
            current_field = 'tags'
        elif line.startswith('### Custom Tags'):
            current_field = 'custom_tags'
        elif line.startswith('### Notes'):
            current_field = 'notes'
        elif line.startswith('###') and current_field:
            # End of current field
            current_field = None
        elif current_field and line and not line.startswith('###'):
            # This is the value for the current field
            if current_field not in data:
                data[current_field] = line
            else:
                data[current_field] += ' ' + line
    
    return data

def extract_source_from_url(url):
    """Extract source website from URL."""
    if not url:
        return ''
    
    # Extract domain from URL
    match = re.match(r'https?://(?:www\.)?([^/]+)', url)
    if match:
        return match.group(1)
    return ''

def generate_recipe_json(data, recipe_id):
    """Generate recipe JSON from extracted data."""
    # Combine tags
    tags = []
    if data.get('tags'):
        tags.extend([tag.strip() for tag in data['tags'].split(',')])
    if data.get('custom_tags'):
        tags.extend([tag.strip() for tag in data['custom_tags'].split(',')])
    
    # Remove duplicates and empty tags
    tags = list(set([tag for tag in tags if tag]))
    
    # Extract source from URL
    source = extract_source_from_url(data.get('url', ''))
    
    recipe = {
        "id": recipe_id,
        "title": data.get('title', ''),
        "url": data.get('url', ''),
        "time_added": int(datetime.now().timestamp()),
        "tags": tags,
        "source": source
    }
    
    return recipe

def main():
    if len(sys.argv) != 2:
        print("Usage: python test_issue_form.py <issue_body_file>")
        sys.exit(1)
    
    issue_file = sys.argv[1]
    
    try:
        with open(issue_file, 'r') as f:
            issue_body = f.read()
    except FileNotFoundError:
        print(f"Error: File {issue_file} not found")
        sys.exit(1)
    
    # Extract data
    data = extract_issue_data(issue_body)
    
    print("Extracted data:")
    for key, value in data.items():
        print(f"  {key}: {value}")
    
    # Generate recipe JSON
    recipe = generate_recipe_json(data, "recipe_9999")
    
    print("\nGenerated recipe JSON:")
    print(json.dumps(recipe, indent=2))

if __name__ == "__main__":
    main() 