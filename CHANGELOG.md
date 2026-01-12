# Histórico de Alterações

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

## [1.2.0] - 2026-01-12

### Funcionalidades Adicionadas

- **Sistema de Atalhos de Teclado**
  - Atalhos globais para navegação e ações rápidas
  - Diálogo de ajuda com lista completa de atalhos (Ctrl+? ou F1)
  - Suporte para modificadores Ctrl (Windows/Linux) e Cmd (Mac)
  - Atalhos não interferem quando digitando em campos de entrada
  - Atalhos disponíveis:
    - **Ctrl+K** ou **/** - Focar no campo de entrada de tarefa
    - **Ctrl+G** - Alternar entre tema claro e escuro
    - **Ctrl+J** - Alternar nível de contraste (padrão → médio → alto → padrão)
    - **Ctrl+L** - Alternar idioma (português ↔ inglês)
    - **1, 2, 3** - Filtrar tarefas (Todas, Ativas, Concluídas)
    - **Ctrl+Delete** - Limpar tarefas concluídas
    - **Ctrl+Shift+Delete** - Limpar todas as tarefas
    - **Ctrl+?** ou **F1** - Mostrar diálogo de ajuda

- **Sistema de Testes**
  - Framework de testes unitários sem dependências externas
  - Testes para módulos: Storage, Todo, i18n, Keyboard
  - Testes de integração para fluxos completos da aplicação
  - Página de testes com interface visual e suporte a temas/i18n
  - Agrupamento de testes por categoria
  - Relatórios detalhados de resultados

- **Internacionalização (i18n)**
  - Suporte completo para português e inglês
  - Seletor de idioma no canto superior direito
  - Detecção automática do idioma do navegador
  - Preferência de idioma persistida no localStorage
  - Tradução de todos os textos da interface, incluindo diálogos e mensagens

### Melhorias

- **Acessibilidade**: Atalhos de teclado melhoram significativamente a navegação para usuários que preferem teclado
- **Experiência do Usuário**: Alternância rápida de tema, contraste e idioma via teclado
- **Qualidade de Código**: Cobertura de testes garante maior confiabilidade
- **Documentação**: README atualizado com seção completa de atalhos de teclado

### Detalhes Técnicos

- Criado módulo `keyboard.js` para gerenciamento de atalhos
- Implementado sistema de testes customizado (`test-runner.js`)
- Adicionado módulo `i18n.js` para internacionalização
- Testes unitários para todos os módulos principais
- Testes de integração para validação de fluxos completos

## [1.1.0] - 2024-12-29

### Funcionalidades Adicionadas

- **Reordenação por Arrastar e Soltar** (#22)
  - Arraste tarefas para reordená-las na lista
  - Funciona perfeitamente com todos os filtros (Todas, Ativas, Concluídas)
  - Ordem persistida no localStorage
  - Feedback visual com animações seguindo Material Design 3
  - Suporte a dispositivos touch
  - Suporte à preferência de movimento reduzido

- **Edição de Tarefas Existentes** (#20)
  - Menu suspenso com opções Editar e Excluir (menu de três pontos)
  - Diálogo de edição de tarefa com validação de formulário
  - Diálogo de confirmação de exclusão para prevenir remoções acidentais
  - Diálogos compatíveis com Material Design 3
  - Suporte a navegação por teclado (Escape para fechar diálogos)
  - Atributos ARIA adequados para acessibilidade

- **Sistema de Temas**
  - Alternância entre tema claro e escuro
  - Múltiplos níveis de contraste (Padrão, Médio, Alto)
  - Preferências de tema e contraste persistidas no localStorage
  - Transições suaves entre temas

- **Limpar Todas as Tarefas**
  - Botão para remover todas as tarefas de uma vez
  - Confirmação antes de limpar (via diálogo de confirmação de exclusão)

### Alterado

- **Geração de ID de Tarefa**: Mudança de IDs baseados em timestamp para IDs baseados em UUID (com fallback para timestamp)
- **Comportamento de Exclusão**: Agora requer confirmação via diálogo antes de remover tarefas
- **Componentes de UI**: Todos os componentes agora seguem as diretrizes do Material Design 3
- **Estrutura do Projeto**: CSS reorganizado em estrutura modular (base, layout, components, themes, utilities)

### Melhorias

- **Acessibilidade**: Atributos ARIA aprimorados em toda a aplicação
- **Experiência do Usuário**: Melhor feedback visual para todas as interações
- **Organização do Código**: Estrutura de módulos e separação de responsabilidades melhoradas
- **Design Responsivo**: Melhor suporte para dispositivos touch

### Detalhes Técnicos

- Adicionada função `updateTask()` ao módulo de gerenciamento de tarefas
- Adicionada função `reorderTasks()` para funcionalidade de arrastar e soltar
- Implementados componentes de diálogo personalizados
- Implementado componente de menu suspenso
- Melhorado tratamento de eventos de arrastar e soltar

## [1.0.0] - Lançamento Inicial

### Funcionalidades Iniciais

- **Gerenciamento de Tarefas Principal**
  - Adicionar novas tarefas
  - Marcar tarefas como concluídas/incompletas (alternar)
  - Remover tarefas
  - Tarefas persistidas no armazenamento do navegador (localStorage)

- **Filtragem**
  - Filtrar tarefas por status: Todas, Ativas, Concluídas
  - Indicador visual para filtro ativo

- **Limpar Concluídas**
  - Botão para remover todas as tarefas concluídas de uma vez

- **Layout Responsivo**
  - Interface limpa e minimalista
  - Design responsivo para diferentes tamanhos de tela

### Stack Técnico

- JavaScript Vanilla (módulos ES6)
- CSS moderno com propriedades personalizadas
- localStorage para persistência de dados
- Estrutura de código modular (módulos storage, todo, ui)

---

## [Não Lançado]

### Planejado

- Testes unitários e de integração
- GIFs de demonstração adicionais
- Categorias/tags de tarefas
- Datas de vencimento de tarefas
- Prioridades de tarefas
- Exportar/importar tarefas (JSON)
- Funcionalidade de busca de tarefas
- Gestos de deslizar em dispositivos móveis

---

## Formato das Notas de Lançamento

- **Adicionado** para novas funcionalidades
- **Alterado** para mudanças em funcionalidades existentes
- **Descontinuado** para funcionalidades que serão removidas em breve
- **Removido** para funcionalidades agora removidas
- **Corrigido** para correções de bugs
- **Segurança** para correções de vulnerabilidades

[1.2.0]: https://github.com/herissonneves/axio/releases/tag/v1.2.0
[1.1.0]: https://github.com/herissonneves/axio/releases/tag/v1.1.0
[1.0.0]: https://github.com/herissonneves/axio/releases/tag/v1.0.0
