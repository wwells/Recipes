#!/usr/bin/env python3
"""
Simple YAML validation script for GitHub Actions workflow files.
"""

import sys
import re

def validate_yaml(file_path):
    """Basic YAML validation by checking indentation and structure."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        print(f"Validating {file_path}...")
        print(f"Total lines: {len(lines)}")
        
        # Check for common YAML issues
        for i, line in enumerate(lines, 1):
            # Check for tabs (should use spaces)
            if '\t' in line:
                print(f"  Line {i}: Contains tab character (use spaces instead)")
            
            # Check for mixed indentation
            if line.strip() and not line.startswith('#'):
                indent = len(line) - len(line.lstrip())
                if indent % 2 != 0 and indent > 0:
                    print(f"  Line {i}: Odd indentation ({indent} spaces)")
        
        # Check for basic structure
        has_name = False
        has_on = False
        has_jobs = False
        
        for line in lines:
            if line.strip().startswith('name:'):
                has_name = True
            elif line.strip().startswith('on:'):
                has_on = True
            elif line.strip().startswith('jobs:'):
                has_jobs = True
        
        if not has_name:
            print("  Missing 'name:' field")
        if not has_on:
            print("  Missing 'on:' field")
        if not has_jobs:
            print("  Missing 'jobs:' field")
        
        if has_name and has_on and has_jobs:
            print("  ✅ Basic structure looks good")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error reading file: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python validate_yaml.py <yaml_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    success = validate_yaml(file_path)
    
    if success:
        print("✅ YAML validation completed")
    else:
        print("❌ YAML validation failed")
        sys.exit(1) 