# Módulo de Atalhos de Teclado

Sistema modular para gerenciamento de atalhos de teclado na aplicação.

## 📁 Estrutura de Arquivos

```plaintext
keyboard/
├── index.js                    # Ponto de entrada - exporta tudo
├── keyboard-config.js          # Configurações e constantes
├── keyboard-utils.js           # Funções utilitárias
├── keyboard-dom.js             # Criação de elementos DOM
├── keyboard-shortcuts.js       # Processamento de atalhos
├── keyboard-dialog.js          # Gerenciamento do diálogo
└── README.md                   # Esta documentação
```

## 📦 Módulos

### 1. **keyboard-config.js**

Configurações e constantes do sistema.

**Exporta:**

- `KEYBOARD_SHORTCUTS` - Mapeamento de todos os atalhos
- `BLOCKED_TAGS` - Tags HTML que bloqueiam atalhos
- `SPECIAL_ALLOWED_KEYS` - Teclas permitidas em qualquer contexto

**Exemplo:**

```javascript
import { KEYBOARD_SHORTCUTS } from "./keyboard-config.js";

console.log(KEYBOARD_SHORTCUTS.FOCUS_INPUT);
// { key: "k", modifier: true, handler: "focusInput" }
```

### 2. **keyboard-utils.js**

Funções utilitárias puras para processamento de eventos.

**Exporta:**

- `isModifierPressed(event)` - Detecta Ctrl/Cmd
- `shouldBlockShortcut(event)` - Valida contexto de execução
- `matchesShortcut(event, config)` - Compara evento com configuração
- `normalizeKey(key)` - Normaliza tecla para comparação

**Exemplo:**

```javascript
import { isModifierPressed, matchesShortcut } from "./keyboard-utils.js";

const event = { key: "k", ctrlKey: true };
if (isModifierPressed(event)) {
  console.log("Modificador pressionado!");
}
```

**Características:**

- ✅ Funções puras (sem efeitos colaterais)
- ✅ Facilmente testáveis
- ✅ Sem dependências de DOM

### 3. **keyboard-dom.js**

Criação de elementos DOM para o diálogo de atalhos.

**Exporta:**

- `createShortcutItem(shortcut)` - Item individual
- `createShortcutsList()` - Lista completa
- `createDialogTitle()` - Título do diálogo
- `createCloseButton(onClose)` - Botão fechar
- `createDialogOverlay(onClose)` - Overlay
- `createDialogContainer(onClose)` - Container
- `createDialogStructure(onClose)` - Estrutura completa

**Exemplo:**

```javascript
import { createShortcutItem } from "./keyboard-dom.js";

const item = createShortcutItem({
  key: "Ctrl+K",
  description: "Focar no campo de busca",
});
document.body.append(item);
```

**Características:**

- ✅ Factory functions para elementos
- ✅ Separação de responsabilidades
- ✅ Reutilizável

### 4. **keyboard-shortcuts.js**

Lógica de processamento e execução de atalhos.

**Exporta:**

- `processShortcut(event, handlers)` - Processa evento
- `createKeyboardListener(handlers)` - Cria listener
- `initKeyboardShortcuts(handlers)` - Inicializa sistema

**Exemplo:**

```javascript
import { initKeyboardShortcuts } from "./keyboard-shortcuts.js";

const cleanup = initKeyboardShortcuts({
  focusInput: () => document.querySelector("input").focus(),
  toggleTheme: () => document.body.classList.toggle("dark"),
  // ... outros handlers
});

// Limpar quando não for mais necessário
cleanup();
```

**Características:**

- ✅ Retorna função de cleanup
- ✅ Processamento eficiente
- ✅ Extensível

### 5. **keyboard-dialog.js**

Gerenciamento do diálogo de ajuda.

**Exporta:**

- `showKeyboardShortcutsDialog()` - Exibe diálogo

**Exemplo:**

```javascript
import { showKeyboardShortcutsDialog } from "./keyboard-dialog.js";

button.addEventListener("click", showKeyboardShortcutsDialog);
```

**Características:**

- ✅ Previne múltiplos diálogos
- ✅ Gerencia foco e overflow
- ✅ Suporte a Escape

### 6. **index.js**

Ponto de entrada que re-exporta tudo.

**Uso:**

```javascript
// Importar tudo de uma vez
import * as Keyboard from "./keyboard/index.js";

// Ou importar seletivamente
import {
  initKeyboardShortcuts,
  showKeyboardShortcutsDialog,
} from "./keyboard/index.js";
```

## 🎯 Uso Básico

### Inicializar Atalhos

```javascript
import { initKeyboardShortcuts } from "./keyboard/index.js";

const handlers = {
  focusInput: () => {
    document.querySelector("#search").focus();
  },
  toggleTheme: () => {
    document.body.classList.toggle("dark-theme");
  },
  setFilterAll: () => {
    showAllTasks();
  },
  // ... outros handlers
  showHelp: () => {
    showKeyboardShortcutsDialog();
  },
};

// Inicializar
const cleanup = initKeyboardShortcuts(handlers);

// Limpar quando necessário (ex: ao desmontar componente)
window.addEventListener("beforeunload", cleanup);
```

### Exibir Diálogo de Ajuda

```javascript
import { showKeyboardShortcutsDialog } from "./keyboard/index.js";

document
  .querySelector("#help-button")
  .addEventListener("click", showKeyboardShortcutsDialog);
```

## 🧪 Testes

Os testes estão em `tests/keyboard.test.js` e cobrem:

- ✅ `isModifierPressed` - Detecção de Ctrl/Cmd
- ✅ `shouldBlockShortcut` - Validação de contexto
- ✅ `matchesShortcut` - Correspondência de atalhos
- ✅ Configurações de atalhos

**Executar testes:**

```bash
# No navegador
Abrir tests/tests.html
```

## 🔧 Adicionar Novo Atalho

1. **Adicionar em keyboard-config.js:**

```javascript
export const KEYBOARD_SHORTCUTS = {
  // ... atalhos existentes
  NEW_SHORTCUT: {
    key: "n",
    modifier: true,
    handler: "myNewHandler",
  },
};
```

2. **Adicionar handler no main.js:**

```javascript
initKeyboardShortcuts({
  // ... handlers existentes
  myNewHandler: () => {
    console.log("Novo atalho executado!");
  },
});
```

3. **(Opcional) Adicionar à lista do diálogo em keyboard-dom.js:**

```javascript
const shortcuts = [
  // ... atalhos existentes
  {
    key: t("shortcutKeyNewShortcut"),
    description: t("shortcutNewShortcut"),
  },
];
```

## 📊 Benefícios da Modularização

| Aspecto            | Antes        | Depois                   |
| ------------------ | ------------ | ------------------------ |
| **Arquivos**       | 1            | 6 especializados         |
| **Linhas/arquivo** | 315          | ~60 média                |
| **Testabilidade**  | Difícil      | Fácil (funções isoladas) |
| **Manutenção**     | Monolítica   | Modular                  |
| **Reutilização**   | Baixa        | Alta                     |
| **Importações**    | Tudo ou nada | Seletivas                |

## 🎨 Padrões Aplicados

1. **Module Pattern** - Cada arquivo é um módulo independente
2. **Single Responsibility** - Cada módulo tem uma responsabilidade
3. **Factory Pattern** - Funções criadoras de elementos DOM
4. **Strategy Pattern** - Sistema de handlers configurável
5. **Dependency Injection** - Handlers injetados via parâmetro
6. **Pure Functions** - Utilitários sem efeitos colaterais

## 🔄 Retrocompatibilidade

O arquivo `keyboard.js` original agora re-exporta tudo:

```javascript
// Código antigo continua funcionando
import { initKeyboardShortcuts } from "./keyboard.js";

// Novo código pode importar dos módulos
import { initKeyboardShortcuts } from "./keyboard/index.js";
```

## 📈 Próximos Passos

- [ ] Adicionar testes de integração
- [ ] Implementar cache de configuração
- [ ] Adicionar validação de conflitos de atalhos
- [ ] Criar builder para configuração
- [ ] Adicionar telemetria de uso de atalhos

## 📝 Convenções

- **Arquivos**: kebab-case (keyboard-config.js)
- **Funções**: camelCase (createShortcutItem)
- **Constantes**: UPPER_SNAKE_CASE (KEYBOARD_SHORTCUTS)
- **Exports**: Named exports (não default)

---

**Versão**: 2.0.0  
**Data**: 2026-01-30  
**Autor**: AI Assistant
