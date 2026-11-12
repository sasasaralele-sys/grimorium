# 🌙 Grimorium — Gestão Pessoal e Guias de Práticas Esotéricas

Aplicação mobile desenvolvida em **React Native (Expo)** com back-end em **Node.js/Express** e banco de dados **MySQL**, estruturada para solucionar a desorganização de anotações espirituais, receitas de ervas e rituais pessoais.

---

## 🎯 Problema Identificado e Proposta de Solução

* **Problema:** Praticantes de espiritualidade, bruxaria natural e estudos esotéricos frequentemente sofrem com anotações dispersas em cadernos físicos ou blocos de notas genéricos, dificultando a consulta rápida de correspondências de ervas, fases lunares e rituais pessoais, além de correrem o risco de perda de registros.
* **Solução:** O **Grimorium** oferece um ambiente digital seguro e centralizado onde usuários autenticados podem consultar guias públicos de ervas/culinária mágica e gerenciar seu próprio grimório privado (CRUD completo), com controle de acesso diferenciado entre praticantes e administradores.

---

## 🛠️ Tecnologias Utilizadas

* **Mobile (Front-end):** React Native, Expo, React Navigation
* **Back-end (API REST):** Node.js, Express, CORS, Dotenv
* **Banco de Dados:** MySQL
* **Segurança e Autenticação:** JSON Web Token (`jsonwebtoken`), `bcryptjs` (hash de senhas), Bearer Token

---

## 📂 Estrutura do Projeto

```text
grimorium/
│
├── backend/                  # API REST Node.js + Express
│   ├── controllers/          # Lógica de negócios (Auth e Rituais)
│   ├── database/             # Conexão MySQL e scripts SQL
│   ├── middlewares/          # Validação de JWT e nível de Administrador
│   ├── routes/               # Definição das rotas da API
│   └── app.js             # Servidor principal
│
├── screens/                  # Telas da aplicação React Native
│   ├── Login.js
│   ├── Cadastro.js
│   ├── Home.js
│   ├── CatalogoDicas.js
│   ├── MeuGrimorio.js
│   ├── DetalhesRitual.js
│   ├── CadastrarRitual.js
│   └── Usuarios.js
│
├── services/                 # Comunicação com a API (fetch) e gestão de token
│   └── api.js
│
├── App.js                    # Configuração de rotas (React Navigation)
├── package.json              # Dependências do aplicativo
└── README.md                 # Documentação do projeto