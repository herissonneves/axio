# Componentes CSS

Este diretório contém os estilos dos componentes da interface do usuário, organizados por funcionalidade.

## Estrutura

Cada arquivo CSS contém os estilos de um componente específico ou grupo relacionado de componentes:

### `header.css`

Estilos do cabeçalho da página e título principal.

- `.todo-page__header` - Container do cabeçalho
- `.todo-page__title` - Título principal da aplicação

### `language-selector.css`

Seletor de idioma e menu dropdown.

- `.language-selector` - Botão do seletor de idioma
- `.language-menu` - Menu dropdown de idiomas
- `.language-menu__item` - Item individual do menu

### `theme-controls.css`

Controles de tema (claro/escuro) e contraste.

- `.theme-controls` - Container dos controles
- `.theme-toggle` - Botão de alternância de tema
- `.contrast-selector` - Seletor de nível de contraste

### `form.css`

Formulário de adição de tarefas.

- `.todo-form` - Container do formulário
- `.todo-form__input` - Campo de entrada de texto
- `.todo-form__button` - Botão "Adicionar Tarefa"

### `todo-item.css`

Item de tarefa individual e seus elementos.

- `.todo-item` - Container do item de tarefa
- `.todo-item__checkbox` - Checkbox de conclusão
- `.todo-item__text` - Texto da tarefa
- `.todo-item__options-btn` - Botão de opções (⋮)

### `filters.css`

Botões de filtro de visualização (Todas/Ativas/Concluídas).

- `.todo-filters` - Container dos filtros
- `.todo-filters__button-wrapper` - Wrapper do botão
- `.todo-filters__button--active` - Estado ativo do filtro

### `clear-buttons.css`

Botões de limpeza (Limpar Concluídas / Limpar Todas).

- `.todo-clear` - Container dos botões
- `.todo-clear__button` - Botão de limpeza

### `drag-drop.css`

Estilos de interação de arrastar e soltar.

- `.todo-item__drag-handle` - Handle de arraste
- `.todo-item--dragging` - Estado durante o arraste
- `.todo-item--drag-over` - Estado do alvo de soltar

### `menu.css`

Menu de opções da tarefa (Editar/Excluir).

- `.todo-menu` - Container do menu
- `.todo-menu__item` - Item do menu
- `.todo-menu__icon` - Ícone do item

### `dialog.css`

Diálogos modais (editar tarefa, excluir, atalhos).

- `.todo-dialog` - Container do diálogo
- `.todo-dialog__overlay` - Overlay de fundo
- `.todo-dialog__container` - Container do conteúdo
- `.todo-dialog__button` - Botões de ação
- `.shortcuts-dialog` - Diálogo de atalhos de teclado

## Uso

Os componentes são importados automaticamente através do arquivo `css/components.css` principal, que é então importado pelo `css/main.css`.

## Material Design 3

Todos os componentes seguem as diretrizes do Material Design 3:

- Uso de tokens de cor (`--md-sys-color-*`)
- Tipografia (`--md-text-*`)
- Camadas de estado (state layers) para interatividade
- Elevação e sombras adequadas
- Animações suaves e transições

## Acessibilidade

Os componentes incluem:

- Estados de foco visíveis
- Contraste adequado de cores
- Suporte a `prefers-reduced-motion`
- Tamanhos de toque apropriados para dispositivos móveis
