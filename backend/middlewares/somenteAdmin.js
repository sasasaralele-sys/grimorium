function verificarAdmin(req, res, next) {
  // O req.usuario vem do middleware verificarToken que já decodificou o JWT
  if (!req.usuario || req.usuario.nivel !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas administradores podem executar esta ação.' });
  }
  next();
}

module.exports = { verificarAdmin };