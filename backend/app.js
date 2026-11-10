const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conecta ao banco de dados MySQL
require('./database/conexao');

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const rituaisRoutes = require('./routes/rituaisRoutes'); // Nova rota da Entrega 3

const app = express();
app.use(express.json());
app.use(cors());

// Registro das rotas
app.use('/api/auth', authRoutes);
app.use('/api/rituais', rituaisRoutes); // Ativa /api/rituais

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Grimorium rodando perfeitamente! 🌿✨' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});