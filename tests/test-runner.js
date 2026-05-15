/**
 * Simple Test Runner
 *
 * Unit test framework with no external dependencies.
 * Provides basic functionality for:
 * - Test registration and execution
 * - Assertions (assert, assertEquals, assertTrue, etc.)
 * - Grouping by category
 * - Result reports (console and HTML)
 * - Support for synchronous and asynchronous tests
 */

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
    this.passed = 0;
    this.failed = 0;
    this.currentCategory = null;
  }

  /**
   * Sets the current category for upcoming tests
   * @param {string} name - Category name
   */
  category(name) {
    this.currentCategory = name;
  }

  /**
   * Registers a new test
   * @param {string} name - Test name
   * @param {Function} fn - Test function to run
   */
  test(name, fn) {
    this.tests.push({ name, fn, category: this.currentCategory || "Uncategorized" });
  }

  /**
   * Asserts that a condition is true
   * @param {boolean} condition - Condition to verify
   * @param {string} message - Error message if the condition is false
   * @throws {Error} If the condition is false
   */
  assert(condition, message = "Assertion failed") {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that two values are equal (deep comparison via JSON)
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @param {string} message - Custom error message (optional)
   * @throws {Error} If the values are not equal
   */
  assertEquals(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(
        message || `Expected ${expectedStr}, but got ${actualStr}`
      );
    }
  }

  /**
   * Asserts that two values are not equal
   * @param {*} actual - First value
   * @param {*} expected - Second value
   * @param {string} message - Custom error message (optional)
   * @throws {Error} If the values are equal
   */
  assertNotEquals(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
      throw new Error(
        message || `Expected different values, but both are ${actualStr}`
      );
    }
  }

  /**
   * Asserts that a value is truthy
   * @param {*} value - Value to verify
   * @param {string} message - Error message (optional)
   * @throws {Error} If the value is falsy
   */
  assertTrue(value, message = "Expected truthy value") {
    if (!value) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that a value is falsy
   * @param {*} value - Value to verify
   * @param {string} message - Error message (optional)
   * @throws {Error} If the value is truthy
   */
  assertFalse(value, message = "Expected falsy value") {
    if (value) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that a function throws an error
   * @param {Function} fn - Function that should throw
   * @param {string} message - Error message (optional)
   * @throws {Error} If the function does not throw
   */
  assertThrows(fn, message = "Expected function to throw an error") {
    try {
      fn();
      throw new Error(message);
    } catch (error) {
      if (error.message === message) {
        throw error;
      }
      // Expected error was thrown
    }
  }

  /**
   * Runs all registered tests
   * Supports synchronous and asynchronous tests
   * @returns {Promise<void>}
   */
  async run() {
    console.log("Running tests...\n");

    for (const { name, fn, category } of this.tests) {
      try {
        const result = fn();
        // Handle synchronous and asynchronous functions
        if (result && typeof result.then === "function") {
          await result;
        }
        this.passed++;
        this.results.push({ name, passed: true, error: null, category: category || "Uncategorized" });
        console.log(`✓ ${name}`);
      } catch (error) {
        this.failed++;
        const errorMessage = error?.message || String(error);
        this.results.push({ name, passed: false, error: errorMessage, category: category || "Uncategorized" });
        console.error(`✗ ${name}`);
        console.error(`  ${errorMessage}`);
        if (error?.stack) {
          console.error(`  ${error.stack}`);
        }
      }
    }

    this.printSummary();
  }

  /**
   * Prints a summary of test results to the console
   */
  printSummary() {
    console.log("\n" + "=".repeat(50));
    console.log(`Tests: ${this.passed} passed, ${this.failed} failed, ${this.tests.length} total`);
    console.log("=".repeat(50));
  }

  /**
   * Generates HTML with test results grouped by category
   * @param {Function} t - Translation function (optional)
   * @returns {string} Formatted HTML with results
   */
  getResultsHTML(t = null) {
    const translate = (key, fallback) => t ? t(key) : fallback;

    let html = "<div class='test-results'>";
    html += `<h2>${translate("testResults", "Test Results")}</h2>`;

    // Group results by category
    const categories = {};
    for (const result of this.results) {
      const category = result.category || "Uncategorized";
      if (!categories[category]) {
        categories[category] = { results: [], passed: 0, failed: 0 };
      }
      categories[category].results.push(result);
      if (result.passed) {
        categories[category].passed++;
      } else {
        categories[category].failed++;
      }
    }

    // Display results by category
    for (const [categoryName, categoryData] of Object.entries(categories)) {
      const categoryTotal = categoryData.results.length;
      const categoryPassed = categoryData.passed;
      const categoryFailed = categoryData.failed;

      // Map category names to translation keys (keys match runner.category() values in test files)
      const categoryMap = {
        "Unit Tests - Storage": translate("testCategoryUnitStorage", "Unit Tests - Storage"),
        "Testes Unitários - Storage": translate("testCategoryUnitStorage", "Unit Tests - Storage"),
        "Unit Tests - Todo": translate("testCategoryUnitTodo", "Unit Tests - Todo"),
        "Testes Unitários - Todo": translate("testCategoryUnitTodo", "Unit Tests - Todo"),
        "Unit Tests - i18n": translate("testCategoryUniti18n", "Unit Tests - i18n"),
        "Testes Unitários - i18n": translate("testCategoryUniti18n", "Unit Tests - i18n"),
        "Unit Tests - Keyboard": translate("testCategoryUnitKeyboard", "Unit Tests - Keyboard"),
        "Testes Unitários - Keyboard": translate("testCategoryUnitKeyboard", "Unit Tests - Keyboard"),
        "Testes de Integração": translate("testCategoryIntegration", "Integration Tests"),
        "UI Module Tests": translate("testCategoryUnitUI", "UI Module Tests"),
        "Testes do Módulo UI": translate("testCategoryUnitUI", "UI Module Tests"),
        "App Module Tests": translate("testCategoryUnitApp", "App Module Tests"),
        "Testes do Módulo App": translate("testCategoryUnitApp", "App Module Tests"),
      };

      const displayName = categoryMap[categoryName] || categoryName;

      html += `<div class='test-category'>`;
      html += `<h3 class='test-category-title'>${displayName}</h3>`;
      const passedText = translate("testsPassed", "passed");
      const failedText = translate("testsFailed", "failed");
      const totalText = translate("testsTotal", "total");
      html += `<div class='test-category-summary'>${categoryPassed} ${passedText}, ${categoryFailed} ${failedText}, ${categoryTotal} ${totalText}</div>`;

      for (const result of categoryData.results) {
        const status = result.passed ? "passed" : "failed";
        const icon = result.passed ? "✓" : "✗";
        html += `<div class='test-result test-${status}'>`;
        html += `<span class='test-icon'>${icon}</span>`;
        html += `<span class='test-name'>${result.name}</span>`;
        if (result.error) {
          html += `<div class='test-error'>${result.error}</div>`;
        }
        html += "</div>";
      }

      html += "</div>";
    }

    html += "<div class='test-summary'>";
    const passedText = translate("testsPassed", "passed");
    const failedText = translate("testsFailed", "failed");
    const totalText = translate("testsTotal", "total");
    html += `<strong>Total: ${this.passed} ${passedText}, ${this.failed} ${failedText}, ${this.tests.length} ${totalText}</strong>`;
    html += "</div>";
    html += "</div>";

    return html;
  }
}

// Export for use in tests
if (typeof window !== "undefined") {
  window.TestRunner = TestRunner;
}
// Default export for ES modules
export default TestRunner;
if (typeof module !== "undefined" && module.exports) {
  module.exports = TestRunner;
}
