# 📚 Políticas do Repositório & Fluxo de Contribuição

Este repositório usa um fluxo de trabalho com branch protegido para manter a branch `main` estável e evitar commits não intencionais ou acidentais diretamente nela.  

## ✅ Regras de Proteção da Branch (main)

- Commits diretos ou force-pushes para `main` **não são permitidos**.  
- Exclusão da branch é **proibida**.  
- Todas as alterações para `main` devem passar por um **Pull Request**.  
- Cada Pull Request deve ter pelo menos **uma revisão aprovada** antes do merge.  
- Após revisão, o código deve ser mesclado via merge do PR do GitHub (merge / squash / rebase).  

## 🔄 Fluxo de Contribuição / Desenvolvimento (para você ou colaboradores)

1. Crie uma nova branch para seu trabalho (ex.: `feat/xxx`, `fix/yyy`, etc.).  
2. Faça commits localmente em sua branch — sinta-se livre para estruturar commits conforme necessário.  
3. Envie sua branch para o repositório (push).  
4. Abra um Pull Request (PR) direcionado para `main`.  
5. Aguarde revisão e aprovação (se necessário).  
6. Após aprovação, faça o merge do PR usando um dos métodos permitidos.  
7. **Não** faça push diretamente para `main`, ou rebase-force para reescrever o histórico.  

## 📌 Justificativa

- Prevenir quebras acidentais ou regressões na branch principal.  
- Preservar histórico limpo e revisável.  
- Facilitar manutenção, revisão de código e rastreabilidade.  

Se você deseja contribuir ou testar correções, siga estas diretrizes rigorosamente — elas ajudam a manter o projeto estável e sustentável.  
