/**
 * Simple test runner without external dependencies
 */

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  /**
   * Register a test
   */
  test(name, fn) {
    this.tests.push({ name, fn });
  }

  /**
   * Assert that a condition is true
   */
  assert(condition, message = "Assertion failed") {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Assert that two values are equal
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
   * Assert that two values are not equal
   */
  assertNotEquals(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
      throw new Error(
        message || `Expected values to be different, but both are ${actualStr}`
      );
    }
  }

  /**
   * Assert that a value is truthy
   */
  assertTrue(value, message = "Expected value to be truthy") {
    if (!value) {
      throw new Error(message);
    }
  }

  /**
   * Assert that a value is falsy
   */
  assertFalse(value, message = "Expected value to be falsy") {
    if (value) {
      throw new Error(message);
    }
  }

  /**
   * Assert that a function throws an error
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
   * Run all tests
   */
  async run() {
    console.log("Running tests...\n");

    for (const { name, fn } of this.tests) {
      try {
        const result = fn();
        // Handle both sync and async functions
        if (result && typeof result.then === "function") {
          await result;
        }
        this.passed++;
        this.results.push({ name, passed: true, error: null });
        console.log(`✓ ${name}`);
      } catch (error) {
        this.failed++;
        const errorMessage = error?.message || String(error);
        this.results.push({ name, passed: false, error: errorMessage });
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
   * Print test summary
   */
  printSummary() {
    console.log("\n" + "=".repeat(50));
    console.log(`Tests: ${this.passed} passed, ${this.failed} failed, ${this.tests.length} total`);
    console.log("=".repeat(50));
  }

  /**
   * Get results as HTML
   */
  getResultsHTML() {
    let html = "<div class='test-results'>";
    html += "<h2>Test Results</h2>";

    for (const result of this.results) {
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

    html += "<div class='test-summary'>";
    html += `<strong>Tests: ${this.passed} passed, ${this.failed} failed, ${this.tests.length} total</strong>`;
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
