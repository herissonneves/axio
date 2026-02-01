# Testes Unitários e de Integração - Axio

Sistema de testes unitários e de integração sem dependências externas, usando apenas JavaScript vanilla.

## Estrutura

```plaintext
tests/
├── unit/                      # Testes unitários por módulo
│   ├── storage.test.js        # Testes do módulo de armazenamento
│   ├── todo.test.js           # Testes do módulo de tarefas
│   ├── i18n.test.js           # Testes do módulo de internacionalização
│   ├── keyboard.test.js       # Testes do módulo de atalhos
│   ├── app.test.js            # Testes dos módulos app/* 
│   └── ui.test.js             # Testes dos módulos ui/*
├── integration/               # Testes de integração
│   └── integration.test.js    # Testes de fluxos completos
├── test-runner.js             # Framework de testes customizado
├── tests.html                 # Interface web para executar testes
└── README.md                  # Esta documentação
```

## Como Executar

### No Navegador

1. Abra o arquivo `tests/tests.html` no navegador
2. Clique no botão "Executar Testes"
3. Veja os resultados na tela e no console

### Via Console do Navegador

```javascript
// Importe os módulos necessários
import TestRunner from './tests/test-runner.js';
import { runStorageTests } from './tests/unit/storage.test.js';
import { runTodoTests } from './tests/unit/todo.test.js';
import { runI18nTests } from './tests/unit/i18n.test.js';
import { runKeyboardTests } from './tests/unit/keyboard.test.js';
import { runAppTests } from './tests/unit/app.test.js';
import { runUITests } from './tests/unit/ui.test.js';
import { runIntegrationTests } from './tests/integration/integration.test.js';

// Crie uma instância do test runner
const runner = new TestRunner();

// Registre os testes
runStorageTests(runner);
runTodoTests(runner);
runI18nTests(runner);
runKeyboardTests(runner);
runAppTests(runner);
runUITests(runner);
runIntegrationTests(runner);

// Execute os testes
await runner.run();
```

## API do Test Runner

### Métodos de Teste

- `test(name, fn)` - Registra um teste
- `category(name)` - Define uma categoria de testes
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

### Testes Unitários

#### Storage Module (`unit/storage.test.js`)

- ✅ Carregar tarefas do localStorage
- ✅ Salvar tarefas no localStorage
- ✅ Tratamento de erros (JSON inválido, null, etc.)
- ✅ Retorno de valores padrão quando não há dados

#### Todo Module (`unit/todo.test.js`)

- ✅ Obter lista de tarefas
- ✅ Adicionar nova tarefa
- ✅ Remover tarefa
- ✅ Alternar status de conclusão
- ✅ Atualizar texto da tarefa
- ✅ Limpar tarefas concluídas
- ✅ Limpar todas as tarefas
- ✅ Reordenar tarefas

#### i18n Module (`unit/i18n.test.js`)

- ✅ Funções principais (getLanguage, setLanguage, t, etc) - 35+ testes
- ✅ Utilitários (replacePlaceholders, extractPlaceholders, etc)
- ✅ Detecção de idioma (detectLanguage, isLanguageSupported, etc)
- ✅ Persistência (storage)
- ✅ Traduções e placeholders
- ✅ Inicialização do sistema

#### Keyboard Module (`unit/keyboard.test.js`)

- ✅ Detecção de teclas modificadoras
- ✅ Validação de contexto para bloqueio
- ✅ Correspondência de atalhos com eventos
- ✅ Utilitários de processamento

#### App Module (`unit/app.test.js`)

- ✅ Configurações (app-config.js)
- ✅ Gerenciamento de tema e contraste (app-theme.js)
- ✅ Gerenciamento de filtros (app-filters.js)
- ✅ Integração entre módulos app/*

#### UI Module (`unit/ui.test.js`)

- ✅ Criação de ícones SVG (ui-icons.js)
- ✅ Sistema de drag-and-drop (ui-drag.js)
- ✅ Integração entre componentes UI

### Testes de Integração (`integration/integration.test.js`)

- ✅ Fluxo completo: adicionar, completar e remover tarefa
- ✅ Fluxo completo: múltiplas tarefas, filtrar e limpar
- ✅ Fluxo completo: adicionar, editar e verificar
- ✅ Reordenar tarefas e verificar persistência
- ✅ Limpar tudo e verificar estado vazio
- ✅ Integração entre módulos Storage e Todo
- ✅ Integração entre módulos i18n e Todo
- ✅ Fluxo completo de usuário (add, filter, complete, clear)
- ✅ Operações mantêm integridade dos dados
- ✅ Casos extremos (operações vazias)
- ✅ Múltiplas operações rápidas mantêm consistência

## Estatísticas

- **Total de testes**: 128+ testes
- **Testes unitários**: 87+ testes
- **Testes de integração**: 41+ testes
- **Cobertura estimada**: ~85%
- **Módulos testados**: 7 módulos principais + 4 sub-módulos

## Organização

A estrutura de testes segue a organização modular do código-fonte:

- **`unit/`** - Um arquivo de teste para cada módulo principal ou grupo de módulos relacionados
- **`integration/`** - Testes que verificam a integração entre múltiplos módulos
- **`test-runner.js`** - Framework customizado, independente de bibliotecas externas
- **`tests.html`** - Interface visual para execução e visualização de resultados

## Notas

- Os testes usam `localStorage` do navegador, então certifique-se de executá-los em um ambiente que suporte isso
- Alguns testes podem interferir uns nos outros devido ao estado compartilhado
- Para testes mais isolados, considere limpar o `localStorage` entre testes
- Execute os testes em um servidor HTTP (não `file://`) para evitar problemas com módulos ES6

## Melhorias Futuras

- [ ] Adicionar mocks para `localStorage` e `document`
- [ ] Implementar setup/teardown automático entre testes
- [ ] Adicionar medição de cobertura de código
- [ ] Implementar testes end-to-end com Playwright ou similar
- [ ] Adicionar testes de performance
