# Debug - Tema e Contraste

## 🔍 Diagnóstico do Problema

Os botões de tema e contraste não estão funcionando corretamente. Adicionei logs para identificar o problema.

## 🧪 Como Testar

### 1. Abra o Navegador

1. Abra `index.html` no navegador
2. Abra o **Console do Navegador** (F12 → Aba Console)

### 2. Teste o Botão de Tema

1. Clique no botão de alternância de tema (sol/lua)
2. Verifique no console se aparece:
   ```
   [Theme] Mudando de light para dark
   [Theme] data-theme="dark"
   ```
3. Clique novamente e verifique:
   ```
   [Theme] Mudando de dark para light
   [Theme] data-theme="light"
   ```

### 3. Teste os Botões de Contraste

1. Clique no segundo botão de contraste (medium)
2. Verifique no console:
   ```
   [Contrast] Mudando para: medium
   [Contrast] data-theme="light-medium-contrast"
   ```
3. Clique no terceiro botão (high)
4. Verifique no console:
   ```
   [Contrast] Mudando para: high
   [Contrast] data-theme="light-high-contrast"
   ```

### 4. Verifique o HTML

No console, execute:

```javascript
console.log(document.documentElement.dataset.theme);
```

Deve retornar algo como: `"light"`, `"dark"`, `"light-medium-contrast"`, etc.

## 🐛 Possíveis Problemas

### Problema 1: Logs Não Aparecem

**Causa**: Event listeners não estão sendo vinculados

**Solução**: Verificar se há erros no console antes dos cliques

### Problema 2: Logs Aparecem Mas Tema Não Muda

**Causa**: CSS não está sendo aplicado corretamente

**Verificações**:

1. Verifique se o arquivo CSS está carregado:
   ```javascript
   Array.from(document.styleSheets).map(s => s.href).filter(h => h)
   ```

2. Verifique o atributo data-theme:
   ```javascript
   document.documentElement.getAttribute('data-theme')
   ```

3. Verifique se há CSS sobrescrevendo:
   ```javascript
   getComputedStyle(document.body).backgroundColor
   ```

### Problema 3: data-theme Está Vazio

**Causa**: `applyTheme()` não está funcionando

**Verificação**:
```javascript
// No console
import { applyTheme } from './js/modules/app/app-theme.js';
applyTheme('dark', 'default');
console.log(document.documentElement.dataset.theme);
```

## 📊 Resultados Esperados

### Visual

- **Tema Light**: Fundo claro, texto escuro
- **Tema Dark**: Fundo escuro, texto claro
- **Contraste Default**: Cores padrão
- **Contraste Medium**: Cores mais vibrantes
- **Contraste High**: Máximo contraste

### HTML

```html
<!-- Tema light -->
<html data-theme="light">

<!-- Tema dark -->
<html data-theme="dark">

<!-- Light + medium contrast -->
<html data-theme="light-medium-contrast">

<!-- Dark + high contrast -->
<html data-theme="dark-high-contrast">
```

## 🔧 Próximos Passos

Após testar, informe:

1. ✅ Os logs aparecem no console?
2. ✅ O atributo `data-theme` está sendo atualizado?
3. ✅ A aparência visual está mudando?
4. ❌ Se não, qual é a mensagem de erro (se houver)?

## 💡 Teste Rápido Manual

Cole isso no console para forçar mudança de tema:

```javascript
// Forçar tema dark
document.documentElement.dataset.theme = 'dark';

// Forçar tema light
document.documentElement.dataset.theme = 'light';

// Forçar alto contraste
document.documentElement.dataset.theme = 'dark-high-contrast';
```

Se funcionar manualmente mas não funcionar pelos botões, o problema está nos event listeners ou na lógica JS.

Se não funcionar nem manualmente, o problema está no CSS ou nos arquivos de tema não estarem sendo carregados.
