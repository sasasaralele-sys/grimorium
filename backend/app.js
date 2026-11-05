const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conecta ao banco de dados MySQL
require('./database/conexao');

// IMPORTANTE: Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// IMPORTANTE: Ativa o prefixo /api/auth para as rotas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Grimorium rodando perfeitamente! 🌿✨' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});