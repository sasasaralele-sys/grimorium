# Grimorium 🌿✨

Aplicativo digital de grimório desenvolvido com React Native/Expo, Node.js, Express e MySQL.

## O que foi desenvolvido e implementado (Entrega 2)

### 1. Banco de Dados (MySQL)
* Criação do banco de dados relacional `grimorium`.
* Tabela de `usuarios` configurada com suporte a níveis de acesso (`praticante` e `admin`).
* Tabela de `rituais` estruturada para armazenamento das anotações pessoais.

### 2. Backend (Node.js & Express)
* Servidor REST configurado e rodando na porta 3000.
* Conexão stabelecida com o banco de dados MySQL (`mysql2`).
* Endpoints de Autenticação (`/api/auth`):
  * **Cadastro (`/cadastrar`)**: Com criptografia de senha utilizando `bcryptjs`.
  * **Login (`/login`)**: Com geração de token de sessão `JWT` (jsonwebtoken).
* Middlewares de segurança e validação de rotas configurados.

### 3. Frontend (React Native & Expo)
* Estrutura de navegação de telas implementada.
* Telas de **Login** e **Cadastro** integradas com o backend através de requisições `fetch()`.
* Tratamento de respostas da API e feedback visual para a usuária.