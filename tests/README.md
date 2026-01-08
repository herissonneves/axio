# Testes Unitários - Axio

Sistema de testes unitários sem dependências externas, usando apenas JavaScript vanilla.

## Estrutura

- `test-runner.js` - Framework de testes simples
- `storage.test.js` - Testes para o módulo de armazenamento
- `todo.test.js` - Testes para o módulo de gerenciamento de tarefas
- `i18n.test.js` - Testes para o módulo de internacionalização
- `tests.html` - Interface web para executar os testes

## Como Executar

### No Navegador

1. Abra o arquivo `tests/tests.html` no navegador
2. Clique no botão "Executar Testes"
3. Veja os resultados na tela e no console

### Via Console do Navegador

```javascript
// Importe os módulos necessários
import TestRunner from './tests/test-runner.js';
import { runStorageTests } from './tests/storage.test.js';
import { runTodoTests } from './tests/todo.test.js';
import { runI18nTests } from './tests/i18n.test.js';

// Crie uma instância do test runner
const runner = new TestRunner();

// Registre os testes
runStorageTests(runner);
runTodoTests(runner);
runI18nTests(runner);

// Execute os testes
await runner.run();
```

## API do Test Runner

### Métodos de Teste

- `test(name, fn)` - Registra um teste
- `assert(condition, message)` - Verifica se uma condição é verdadeira
- `assertEquals(actual, expected, message)` - Verifica se dois valores são iguais
- `assertNotEquals(actual, expected, message)` - Verifica se dois valores são diferentes
- `assertTrue(value, message)` - Verifica se um valor é truthy
- `assertFalse(value, message)` - Verifica se um valor é falsy
- `assertThrows(fn, message)` - Verifica se uma função lança um erro

### Exemplo de Uso

```javascript
runner.test("meu teste", () => {
  runner.assertEquals(1 + 1, 2);
  runner.assertTrue(true);
  runner.assertFalse(false);
});
```

## Cobertura de Testes

### Storage Module
- ✅ Carregar tarefas do localStorage
- ✅ Salvar tarefas no localStorage
- ✅ Tratamento de erros (JSON inválido, null, etc.)

### Todo Module
- ✅ Obter lista de tarefas
- ✅ Adicionar nova tarefa
- ✅ Remover tarefa
- ✅ Alternar status de conclusão
- ✅ Atualizar texto da tarefa
- ✅ Limpar tarefas concluídas
- ✅ Limpar todas as tarefas
- ✅ Reordenar tarefas

### i18n Module
- ✅ Obter idiomas disponíveis
- ✅ Definir idioma
- ✅ Carregar idioma do localStorage
- ✅ Traduzir textos
- ✅ Substituir placeholders em traduções
- ✅ Inicializar sistema de i18n

## Notas

- Os testes usam `localStorage` do navegador, então certifique-se de executá-los em um ambiente que suporte isso
- Alguns testes podem interferir uns nos outros devido ao estado compartilhado do módulo `todo.js`
- Para testes mais isolados, considere limpar o `localStorage` entre testes
