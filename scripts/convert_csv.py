#!/usr/bin/env python3
"""
Convert CSV recipe data to JSON format for the recipe app.
"""

import csv
import json
import re
from urllib.parse import urlparse
from datetime import datetime
import os

def clean_title(title):
    """Clean and normalize recipe titles."""
    if not title or title.startswith('http'):
        return "Untitled Recipe"
    
    # Remove common suffixes and clean up
    title = re.sub(r'\s*–\s*[^–]+$', '', title)  # Remove "– site name"
    title = re.sub(r'\s*-\s*[^-]+$', '', title)   # Remove "- site name"
    title = re.sub(r'\s*\|.*$', '', title)        # Remove "| site name"
    title = title.strip()
    
    return title if title else "Untitled Recipe"

def extract_source(url):
    """Extract source domain from URL."""
    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        # Remove www. prefix
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain
    except:
        return "unknown"

def parse_tags(tags_str):
    """Parse and clean tags from CSV."""
    tags = []
    
    # Parse existing tags from CSV
    if tags_str:
        # Split by comma and clean
        csv_tags = [tag.strip().lower() for tag in tags_str.split(',')]
        # Remove empty tags but keep meaningful ones
        tags = [tag for tag in csv_tags if tag and tag not in ['']]
    
    # Normalize common variations
    tag_mapping = {
        'recipies': 'recipes',
        'dessert': 'desserts',
        'main-dish': 'main-dishes',
        'appetizer': 'appetizers'
    }
    
    normalized_tags = []
    for tag in tags:
        normalized_tags.append(tag_mapping.get(tag, tag))
    
    return list(set(normalized_tags))  # Remove duplicates

def categorize_recipe(title):
    """Add automatic categorization based on recipe title."""
    title_lower = title.lower()
    categories = []
    
    # Desserts
    dessert_keywords = ['cake', 'pie', 'cookie', 'brownie', 'pudding', 'ice cream', 'shortcake', 'crumble', 'cobbler', 'cupcake', 'frosting', 'filling']
    if any(keyword in title_lower for keyword in dessert_keywords):
        categories.append('desserts')
    
    # Breads
    bread_keywords = ['bread', 'sourdough', 'focaccia', 'waffle', 'pancake', 'muffin', 'biscuit']
    if any(keyword in title_lower for keyword in bread_keywords):
        categories.append('breads')
    
    # Main dishes
    main_keywords = ['chicken', 'beef', 'pork', 'salmon', 'fish', 'steak', 'ribs', 'meatball', 'lasagna', 'pasta', 'risotto', 'casserole', 'stir-fry']
    if any(keyword in title_lower for keyword in main_keywords):
        categories.append('main-dishes')
    
    # Soups and stews
    soup_keywords = ['soup', 'stew', 'chili', 'broth']
    if any(keyword in title_lower for keyword in soup_keywords):
        categories.append('soups')
    
    # Salads
    salad_keywords = ['salad', 'slaw']
    if any(keyword in title_lower for keyword in salad_keywords):
        categories.append('salads')
    
    # Side dishes
    side_keywords = ['potato', 'rice', 'bean', 'vegetable', 'asparagus', 'broccoli', 'carrot', 'spinach', 'green bean']
    if any(keyword in title_lower for keyword in side_keywords):
        categories.append('sides')
    
    # Breakfast
    breakfast_keywords = ['breakfast', 'omelette', 'frittata', 'strata', 'eggs benedict']
    if any(keyword in title_lower for keyword in breakfast_keywords):
        categories.append('breakfast')
    
    # Appetizers
    appetizer_keywords = ['appetizer', 'dip', 'spread', 'bruschetta']
    if any(keyword in title_lower for keyword in appetizer_keywords):
        categories.append('appetizers')
    
    return categories

def convert_csv_to_json(csv_file, json_file):
    """Convert CSV recipe data to JSON format."""
    recipes = []
    all_tags_set = set()
    
    print(f"Reading CSV file: {csv_file}")
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for i, row in enumerate(reader):
            # Clean and process data
            title = clean_title(row['title'])
            url = row['url'].strip()
            time_added = int(row['time_added']) if row['time_added'] else 0
            csv_tags = parse_tags(row['tags'])
            
            # Extract source domain
            source = extract_source(url)
            
            # Add automatic categorization
            auto_tags = categorize_recipe(title)
            
            # Combine CSV tags with auto-generated tags
            all_tags = list(set(csv_tags + auto_tags))
            
            # Create recipe object (without status)
            recipe = {
                'id': f"recipe_{i+1:04d}",
                'title': title,
                'url': url,
                'time_added': time_added,
                'tags': all_tags,
                'source': source
            }
            
            recipes.append(recipe)
            
            # Collect all unique tags
            all_tags_set.update(all_tags)
            
            if (i + 1) % 50 == 0:
                print(f"Processed {i + 1} recipes...")
    
    # Create final JSON structure
    data = {
        'recipes': recipes,
        'tags': sorted(list(all_tags_set)),
        'metadata': {
            'total_recipes': len(recipes),
            'converted_at': datetime.now().isoformat(),
            'source_file': csv_file
        }
    }
    
    # Write JSON file
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\nConversion complete!")
    print(f"Total recipes: {len(recipes)}")
    print(f"Total tags: {len(all_tags_set)}")
    print(f"Output file: {json_file}")
    
    # Show some statistics
    print(f"\nTop tags:")
    tag_counts = {}
    for recipe in recipes:
        for tag in recipe['tags']:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
    
    sorted_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)
    for tag, count in sorted_tags[:10]:
        print(f"  {tag}: {count} recipes")

def main():
    """Main conversion function."""
    csv_file = 'data/pocket_export/part_000000.csv'
    json_file = 'data/recipes.json'
    
    # Check if CSV file exists
    if not os.path.exists(csv_file):
        print(f"Error: CSV file not found: {csv_file}")
        print("Please make sure the CSV file is in the data/ directory")
        return
    
    # Check if JSON file already exists and ask for confirmation
    if os.path.exists(json_file):
        print(f"Warning: {json_file} already exists!")
        print("This will overwrite any manual changes you've made.")
        
        # Create backup
        backup_file = f"{json_file}.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        print(f"Creating backup: {backup_file}")
        import shutil
        shutil.copy2(json_file, backup_file)
        
        # Ask for confirmation
        response = input("Do you want to continue? (y/N): ").strip().lower()
        if response not in ['y', 'yes']:
            print("Conversion cancelled. Your original file is unchanged.")
            return
    else:
        print(f"Creating new file: {json_file}")
    
    # Create data directory if it doesn't exist
    os.makedirs(os.path.dirname(json_file), exist_ok=True)
    
    # Convert CSV to JSON
    convert_csv_to_json(csv_file, json_file)

if __name__ == '__main__':
    main() 