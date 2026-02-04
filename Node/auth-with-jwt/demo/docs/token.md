# Token JWT

## O que é o token

O token JWT é uma string gerada pelo servidor que representa um usuário autenticado.

## O que vai no token (payload)

O token deve conter apenas informações necessárias para identificar o usuário.

Exemplos comuns:

- userId
- role (opcional)

## O que NÃO deve ir no token

Informações sensíveis nunca devem ser armazenadas no token.

Exemplos:

- senha
- dados pessoais
- informações confidenciais

## Expiração do token

O token deve ter tempo de expiração definido para aumentar a segurança.

## Por que não confiar cegamente no token

Mesmo sendo assinado, o token deve ser validado a cada requisição.
