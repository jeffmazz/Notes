# Fluxo de autenticação com JWT

1. Usuário envia email e senha
2. API busca o usuário no banco de dados
3. API valida a senha usando bcrypt
4. API gera um token JWT
5. Token é enviado ao cliente
6. Cliente envia o token no header Authorization
7. Middleware valida o token e identifica o usuário
8. Usuário acessa rotas protegidas
