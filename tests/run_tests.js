#!/usr/bin/env node

// Simple test framework for browser-compatible code
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  assert(condition, message = 'Assertion failed') {
    if (!condition) {
      throw new Error(message);
    }
  }

  assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
      throw new Error(`${message} Expected ${expected}, but got ${actual}`);
    }
  }

  assertDeepEqual(actual, expected, message = '') {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(`${message} Expected ${expectedStr}, but got ${actualStr}`);
    }
  }

  run() {
    console.log('🧪 Running tests...\n');
    
    for (const test of this.tests) {
      try {
        test.testFn();
        console.log(`✅ ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${test.name}`);
        console.log(`   Error: ${error.message}`);
        this.failed++;
      }
    }

    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
    
    if (this.failed > 0) {
      process.exit(1);
    }
  }
}

// Mock browser environment for testing
global.window = {
  localStorage: {
    data: {},
    getItem: function(key) {
      return this.data[key] || null;
    },
    setItem: function(key, value) {
      this.data[key] = value;
    },
    removeItem: function(key) {
      delete this.data[key];
    },
    clear: function() {
      this.data = {};
    }
  }
};

global.document = {
  createElement: function(tag) {
    return {
      tagName: tag.toUpperCase(),
      textContent: '',
      innerHTML: '',
      appendChild: function() {},
      setAttribute: function() {},
      getAttribute: function() { return null; }
    };
  },
  querySelector: function() { return null; },
  querySelectorAll: function() { return []; }
};

// Define the functions we want to test (copied from app.js)
function extractTitleFromUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        return `Recipe from ${hostname}`;
    } catch {
        return 'Untitled Recipe';
    }
}

function extractSource(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return 'unknown';
    }
}

// Create test runner
const runner = new TestRunner();

// Test extractTitleFromUrl function
runner.test('extractTitleFromUrl - basic URL', () => {
  runner.assertEqual(
    extractTitleFromUrl('https://www.allrecipes.com/recipe/banana-bread'),
    'Recipe from allrecipes.com'
  );
});

runner.test('extractTitleFromUrl - URL with www', () => {
  runner.assertEqual(
    extractTitleFromUrl('http://www.foodnetwork.com/recipes/recipe'),
    'Recipe from foodnetwork.com'
  );
});

runner.test('extractTitleFromUrl - URL without www', () => {
  runner.assertEqual(
    extractTitleFromUrl('https://smittenkitchen.com/recipe/chocolate-cake'),
    'Recipe from smittenkitchen.com'
  );
});

runner.test('extractTitleFromUrl - invalid URL', () => {
  runner.assertEqual(
    extractTitleFromUrl('not-a-url'),
    'Untitled Recipe'
  );
});

runner.test('extractTitleFromUrl - empty URL', () => {
  runner.assertEqual(
    extractTitleFromUrl(''),
    'Untitled Recipe'
  );
});

// Test extractSource function
runner.test('extractSource - allrecipes.com', () => {
  runner.assertEqual(
    extractSource('https://www.allrecipes.com/recipe/banana-bread'),
    'allrecipes.com'
  );
});

runner.test('extractSource - foodnetwork.com', () => {
  runner.assertEqual(
    extractSource('https://www.foodnetwork.com/recipes/recipe'),
    'foodnetwork.com'
  );
});

runner.test('extractSource - URL without www', () => {
  runner.assertEqual(
    extractSource('https://smittenkitchen.com/recipe/chocolate-cake'),
    'smittenkitchen.com'
  );
});

runner.test('extractSource - invalid URL', () => {
  runner.assertEqual(
    extractSource('not-a-url'),
    'unknown'
  );
});

runner.test('extractSource - empty URL', () => {
  runner.assertEqual(
    extractSource(''),
    'unknown'
  );
});

// Run the tests
runner.run(); 