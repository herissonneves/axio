/**
 * Executor de Testes Simples
 * 
 * Framework de testes unitários sem dependências externas.
 * Fornece funcionalidades básicas para:
 * - Registro e execução de testes
 * - Asserções (assert, assertEquals, assertTrue, etc.)
 * - Agrupamento por categorias
 * - Relatórios de resultados (console e HTML)
 * - Suporte para testes síncronos e assíncronos
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
   * Define a categoria atual para os próximos testes
   * @param {string} name - Nome da categoria
   */
  category(name) {
    this.currentCategory = name;
  }

  /**
   * Registra um novo teste
   * @param {string} name - Nome do teste
   * @param {Function} fn - Função do teste a ser executada
   */
  test(name, fn) {
    this.tests.push({ name, fn, category: this.currentCategory || "Sem categoria" });
  }

  /**
   * Verifica se uma condição é verdadeira
   * @param {boolean} condition - Condição a ser verificada
   * @param {string} message - Mensagem de erro caso a condição seja falsa
   * @throws {Error} Se a condição for falsa
   */
  assert(condition, message = "Asserção falhou") {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Verifica se dois valores são iguais (comparação profunda via JSON)
   * @param {*} actual - Valor obtido
   * @param {*} expected - Valor esperado
   * @param {string} message - Mensagem de erro personalizada (opcional)
   * @throws {Error} Se os valores não forem iguais
   */
  assertEquals(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(
        message || `Esperado ${expectedStr}, mas obteve ${actualStr}`
      );
    }
  }

  /**
   * Verifica se dois valores são diferentes
   * @param {*} actual - Primeiro valor
   * @param {*} expected - Segundo valor
   * @param {string} message - Mensagem de erro personalizada (opcional)
   * @throws {Error} Se os valores forem iguais
   */
  assertNotEquals(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
      throw new Error(
        message || `Esperava valores diferentes, mas ambos são ${actualStr}`
      );
    }
  }

  /**
   * Verifica se um valor é truthy
   * @param {*} value - Valor a ser verificado
   * @param {string} message - Mensagem de erro (opcional)
   * @throws {Error} Se o valor for falsy
   */
  assertTrue(value, message = "Esperava valor truthy") {
    if (!value) {
      throw new Error(message);
    }
  }

  /**
   * Verifica se um valor é falsy
   * @param {*} value - Valor a ser verificado
   * @param {string} message - Mensagem de erro (opcional)
   * @throws {Error} Se o valor for truthy
   */
  assertFalse(value, message = "Esperava valor falsy") {
    if (value) {
      throw new Error(message);
    }
  }

  /**
   * Verifica se uma função lança um erro
   * @param {Function} fn - Função que deve lançar erro
   * @param {string} message - Mensagem de erro (opcional)
   * @throws {Error} Se a função não lançar erro
   */
  assertThrows(fn, message = "Esperava que a função lançasse um erro") {
    try {
      fn();
      throw new Error(message);
    } catch (error) {
      if (error.message === message) {
        throw error;
      }
      // Erro esperado foi lançado
    }
  }

  /**
   * Executa todos os testes registrados
   * Suporta testes síncronos e assíncronos
   * @returns {Promise<void>}
   */
  async run() {
    console.log("Executando testes...\n");

    for (const { name, fn, category } of this.tests) {
      try {
        const result = fn();
        // Tratar funções síncronas e assíncronas
        if (result && typeof result.then === "function") {
          await result;
        }
        this.passed++;
        this.results.push({ name, passed: true, error: null, category: category || "Sem categoria" });
        console.log(`✓ ${name}`);
      } catch (error) {
        this.failed++;
        const errorMessage = error?.message || String(error);
        this.results.push({ name, passed: false, error: errorMessage, category: category || "Sem categoria" });
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
   * Imprime um resumo dos resultados dos testes no console
   */
  printSummary() {
    console.log("\n" + "=".repeat(50));
    console.log(`Testes: ${this.passed} passaram, ${this.failed} falharam, ${this.tests.length} total`);
    console.log("=".repeat(50));
  }

  /**
   * Gera HTML com os resultados dos testes agrupados por categoria
   * @param {Function} t - Função de tradução (opcional)
   * @returns {string} HTML formatado com os resultados
   */
  getResultsHTML(t = null) {
    const translate = (key, fallback) => t ? t(key) : fallback;

    let html = "<div class='test-results'>";
    html += `<h2>${translate("testResults", "Resultados dos Testes")}</h2>`;

    // Agrupar resultados por categoria
    const categories = {};
    for (const result of this.results) {
      const category = result.category || "Sem categoria";
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

    // Exibir resultados por categoria
    for (const [categoryName, categoryData] of Object.entries(categories)) {
      const categoryTotal = categoryData.results.length;
      const categoryPassed = categoryData.passed;
      const categoryFailed = categoryData.failed;

      // Mapear nomes de categoria para chaves de tradução
      const categoryMap = {
        "Testes Unitários - Storage": translate("testCategoryUnitStorage", "Testes Unitários - Storage"),
        "Testes Unitários - Todo": translate("testCategoryUnitTodo", "Testes Unitários - Todo"),
        "Testes Unitários - i18n": translate("testCategoryUniti18n", "Testes Unitários - i18n"),
        "Testes de Integração": translate("testCategoryIntegration", "Testes de Integração"),
      };

      const displayName = categoryMap[categoryName] || categoryName;

      html += `<div class='test-category'>`;
      html += `<h3 class='test-category-title'>${displayName}</h3>`;
      const passedText = translate("testsPassed", "passaram");
      const failedText = translate("testsFailed", "falharam");
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
    const passedText = translate("testsPassed", "passaram");
    const failedText = translate("testsFailed", "falharam");
    const totalText = translate("testsTotal", "total");
    html += `<strong>Total: ${this.passed} ${passedText}, ${this.failed} ${failedText}, ${this.tests.length} ${totalText}</strong>`;
    html += "</div>";
    html += "</div>";

    return html;
  }
}

// Exportar para uso nos testes
if (typeof window !== "undefined") {
  window.TestRunner = TestRunner;
}
// Export padrão para módulos ES
export default TestRunner;
if (typeof module !== "undefined" && module.exports) {
  module.exports = TestRunner;
}
