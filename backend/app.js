const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./database/conexao');

const authRoutes = require('./routes/authRoutes');
const rituaisRoutes = require('./routes/rituaisRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const tematicoRoutes = require('./routes/tematicoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/rituais', rituaisRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tematico', tematicoRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Grimorium rodando perfeitamente! ✨' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});