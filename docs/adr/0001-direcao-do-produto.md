# ADR 0001 — Direção do produto

## Status

Aceito

## Contexto

O Axio possui uma aplicação funcional em JavaScript puro e uma
migração ainda incompleta para Next.js e TypeScript.

## Decisão

A versão 1.4 será dedicada à estabilização da aplicação Vanilla:
testes, acessibilidade, documentação, segurança e CI.

A aplicação em Next.js será tratada como uma v2 experimental e só
substituirá a versão atual após atingir paridade funcional.

## Alternativas consideradas

- Continuar apenas com JavaScript puro.
- Interromper a v1 e migrar imediatamente para Next.js.
- Manter as duas versões indefinidamente.

## Consequências

- A aplicação pública continuará estável durante a migração.
- Correções da v1 poderão precisar ser reaplicadas na v2.
- A migração passa a ter critérios objetivos de conclusão.
