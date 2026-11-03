const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Força o carregamento da conexão com o MySQL ao iniciar o servidor
require('./database/conexao'); 

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Grimorium rodando perfeitamente! 🌿✨' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});