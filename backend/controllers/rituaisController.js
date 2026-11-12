const conexao = require('../database/conexao');

// Listar rituais privados do usuário logado
exports.listarRituais = (req, res) => {
  const usuarioId = req.usuario.id;
  const query = 'SELECT * FROM rituais WHERE usuario_id = ? AND is_oficial = FALSE';
  conexao.query(query, [usuarioId], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar rituais' });
    res.json(results);
  });
};

// Listar conteúdos oficiais (para o Guia Público)
exports.listarOficiais = (req, res) => {
  const query = 'SELECT * FROM rituais WHERE is_oficial = TRUE';
  conexao.query(query, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar conteúdos oficiais' });
    res.json(results);
  });
};

// Criar ritual privado
exports.criarRitual = (req, res) => {
  const { titulo, categoria, conteudo } = req.body;
  const usuarioId = req.usuario.id;

  if (!titulo || !conteudo) {
    return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios' });
  }

  const query = 'INSERT INTO rituais (usuario_id, titulo, categoria, conteudo, is_oficial) VALUES (?, ?, ?, ?, FALSE)';
  conexao.query(query, [usuarioId, titulo, categoria, conteudo], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao salvar ritual' });
    res.status(201).json({ mensagem: 'Ritual salvo com sucesso! ✨', id: result.insertId });
  });
};

// Criar Conteúdo Oficial (Exclusivo Admin)
exports.criarOficial = (req, res) => {
  const { titulo, categoria, conteudo } = req.body;
  const usuarioId = req.usuario.id;

  if (!titulo || !conteudo) {
    return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios' });
  }

  const query = 'INSERT INTO rituais (usuario_id, titulo, categoria, conteudo, is_oficial) VALUES (?, ?, ?, ?, TRUE)';
  conexao.query(query, [usuarioId, titulo, categoria, conteudo], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao publicar conteúdo oficial' });
    res.status(201).json({ mensagem: 'Conteúdo oficial publicado no Guia! 🌟', id: result.insertId });
  });
};

// Deletar ritual
exports.deletarRitual = (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  const query = 'DELETE FROM rituais WHERE id = ? AND usuario_id = ?';
  conexao.query(query, [id, usuarioId], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar ritual' });
    res.json({ mensagem: 'Ritual removido com sucesso!' });
  });
};