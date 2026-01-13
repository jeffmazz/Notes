## O que é JWT?

JWT (JSON Web Token) é um padrão usado para autenticação e autorização em aplicações. Ele permite identificar um usuário de forma segura sem a necessidade de manter sessões no servidor.

Em aplicações Node.js, o JWT é utilizado através de bibliotecas que geram e validam tokens assinados.

## Para que usar JWT?

JWT é utilizado para:

- manter a aplicação stateless
- evitar sessões no servidor
- identificar o usuário a cada requisição
- proteger rotas que exigem autenticação

## Stateless e ausência de sessão

Em um sistema stateless, o servidor não armazena informações sobre o usuário entre requisições. Toda requisição autenticada carrega um token que contém as informações necessárias para identificar o usuário.

Dessa forma, o servidor não precisa manter sessões em memória ou banco de dados.

## Tokens assinados

Os tokens JWT são assinados com uma chave secreta do servidor. Essa assinatura garante que o token não foi alterado e que foi gerado pela própria aplicação.

Caso o token seja modificado ou forjado, a validação falha e o acesso é negado.

## JWT e bcrypt

Em um fluxo de autenticação, o bcrypt é utilizado para validar a senha do usuário no momento do login, enquanto o JWT é utilizado para manter o usuário autenticado nas requisições seguintes.

O bcrypt protege a senha.
O JWT protege o acesso.
