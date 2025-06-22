#!/usr/bin/env python3
"""
Capitalize the first letter of each word in recipe titles.
"""

import json
import os
import re
from datetime import datetime

def capitalize_title(title):
    """Capitalize the first letter of each word in a title."""
    if not title:
        return title
    
    # Split by spaces and capitalize each word
    words = title.split()
    capitalized_words = []
    
    for word in words:
        # Handle special cases like "a", "an", "the", "of", "in", "and", "or", "but"
        # These are typically lowercase in titles unless they're the first or last word
        lowercase_words = {'a', 'an', 'the', 'of', 'in', 'and', 'or', 'but', 'to', 'for', 'with', 'by', 'at', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among'}
        
        # Always capitalize first and last word, and words that aren't in the lowercase list
        if (len(capitalized_words) == 0 or  # First word
            len(words) == len(capitalized_words) + 1 or  # Last word (approximation)
            word.lower() not in lowercase_words or
            len(word) > 3):  # Longer words are usually capitalized
            capitalized_words.append(word.capitalize())
        else:
            capitalized_words.append(word.lower())
    
    return ' '.join(capitalized_words)

def update_titles(json_file):
    """Update all recipe titles to have proper capitalization."""
    
    if not os.path.exists(json_file):
        print(f"Error: File not found: {json_file}")
        return
    
    # Read the current JSON file
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Track changes
    changes = []
    unchanged = []
    
    # Update titles
    for recipe in data['recipes']:
        old_title = recipe['title']
        new_title = capitalize_title(old_title)
        
        if old_title != new_title:
            changes.append((old_title, new_title))
            recipe['title'] = new_title
        else:
            unchanged.append(old_title)
    
    # Update metadata
    if 'metadata' not in data:
        data['metadata'] = {}
    data['metadata']['titles_updated_at'] = datetime.now().isoformat()
    data['metadata']['titles_changed'] = len(changes)
    
    # Create backup before writing
    backup_file = f"{json_file}.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    print(f"Creating backup: {backup_file}")
    import shutil
    shutil.copy2(json_file, backup_file)
    
    # Write updated JSON
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Show results
    print(f"\nTitles updated successfully!")
    print(f"Total recipes: {len(data['recipes'])}")
    print(f"Titles changed: {len(changes)}")
    print(f"Titles unchanged: {len(unchanged)}")
    
    if changes:
        print(f"\nSample changes:")
        for i, (old, new) in enumerate(changes[:10]):  # Show first 10 changes
            print(f"  {i+1}. '{old}' → '{new}'")
        
        if len(changes) > 10:
            print(f"  ... and {len(changes) - 10} more changes")
    
    if unchanged:
        print(f"\nSample unchanged titles:")
        for i, title in enumerate(unchanged[:5]):  # Show first 5 unchanged
            print(f"  {i+1}. '{title}'")
        
        if len(unchanged) > 5:
            print(f"  ... and {len(unchanged) - 5} more")

def main():
    """Main function."""
    json_file = 'data/recipes.json'
    
    print(f"Capitalizing recipe titles in: {json_file}")
    print("This will create a backup before making changes.")
    
    # Ask for confirmation
    response = input("Continue? (y/N): ").strip().lower()
    if response not in ['y', 'yes']:
        print("Update cancelled.")
        return
    
    update_titles(json_file)

if __name__ == '__main__':
    main() 