const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_mistico_do_grimorio';

// Valida o Token JWT enviado por Bearer Token
exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    req.usuario = usuario;
    next();
  });
};

// Verifica se o usuário logado é Administrador
exports.somenteAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.nivel === 'admin') {
    next();
  } else {
    res.status(403).json({ erro: 'Acesso restrito. Apenas administradoras.' });
  }
};