# Middleware de autenticação com JWT

## O que é um middleware

Middleware é uma função que intercepta a requisição antes que ela chegue à rota final.

## Por que usar middleware para autenticação

A autenticação deve ser reutilizável e centralizada, evitando repetição de código em várias rotas.

## Responsabilidade do middleware

O middleware de autenticação é responsável por:

- verificar se o token foi enviado
- validar o token JWT
- identificar o usuário
- permitir ou negar o acesso à rota

## Fluxo do middleware

1. Requisição chega à API
2. Middleware verifica o header Authorization
3. Token é extraído
4. Token é validado
5. Usuário é identificado
6. Requisição segue para a rota

## Erros comuns

- não tratar token ausente
- não tratar token inválido ou expirado
- confiar no token sem validação
