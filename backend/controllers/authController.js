const conexao = require('../database/conexao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_mistico_do_grimorio';

// Cadastro de Usuário
exports.cadastrar = async (req, res) => {
  const { nome, email, senha, nivel } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const userNivel = nivel || 'praticante';

    const query = 'INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)';
    conexao.query(query, [nome, email, senhaHash, userNivel], (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err });
      }
      res.status(201).json({ mensagem: 'Usuária cadastrada com sucesso!', id: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
};

// Login de Usuário
exports.login = (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  conexao.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro no servidor' });
    if (results.length === 0) return res.status(404).json({ erro: 'Usuária não encontrada' });

    const usuario = results[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

    // Gerando o JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nivel: usuario.nivel },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, nivel: usuario.nivel }
    });
  });
};