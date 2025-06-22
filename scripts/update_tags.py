#!/usr/bin/env python3
"""
Update the tags list in recipes.json based on all tags currently used in recipes.
"""

import json
import os
from datetime import datetime

def update_tags_list(json_file):
    """Update the tags list in the JSON file."""
    
    if not os.path.exists(json_file):
        print(f"Error: File not found: {json_file}")
        return
    
    # Read the current JSON file
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Collect all unique tags from recipes
    all_tags = set()
    for recipe in data['recipes']:
        if 'tags' in recipe:
            all_tags.update(recipe['tags'])
    
    # Sort tags alphabetically
    sorted_tags = sorted(list(all_tags))
    
    # Update the tags list
    old_tags = data.get('tags', [])
    data['tags'] = sorted_tags
    
    # Update metadata
    if 'metadata' not in data:
        data['metadata'] = {}
    data['metadata']['tags_updated_at'] = datetime.now().isoformat()
    data['metadata']['total_tags'] = len(sorted_tags)
    
    # Create backup before writing
    backup_file = f"{json_file}.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    print(f"Creating backup: {backup_file}")
    import shutil
    shutil.copy2(json_file, backup_file)
    
    # Write updated JSON
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Show results
    print(f"\nTags updated successfully!")
    print(f"Total tags: {len(sorted_tags)}")
    print(f"Total recipes: {len(data['recipes'])}")
    
    print(f"\nCurrent tags:")
    for tag in sorted_tags:
        # Count how many recipes use this tag
        count = sum(1 for recipe in data['recipes'] if tag in recipe.get('tags', []))
        print(f"  {tag}: {count} recipes")
    
    if old_tags != sorted_tags:
        print(f"\nChanges:")
        added = set(sorted_tags) - set(old_tags)
        removed = set(old_tags) - set(sorted_tags)
        
        if added:
            print(f"  Added: {', '.join(sorted(added))}")
        if removed:
            print(f"  Removed: {', '.join(sorted(removed))}")
    else:
        print(f"\nNo changes needed - tags list was already up to date.")

def main():
    """Main function."""
    json_file = 'data/recipes.json'
    
    print(f"Updating tags list in: {json_file}")
    print("This will create a backup before making changes.")
    
    # Ask for confirmation
    response = input("Continue? (y/N): ").strip().lower()
    if response not in ['y', 'yes']:
        print("Update cancelled.")
        return
    
    update_tags_list(json_file)

if __name__ == '__main__':
    main() 