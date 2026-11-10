const conexao = require('../database/conexao');

// Listar rituais (do usuário logado)
exports.listarRituais = (req, res) => {
  const usuarioId = req.usuario.id;

  const query = 'SELECT * FROM rituais WHERE usuario_id = ?';
  conexao.query(query, [usuarioId], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar rituais' });
    }
    res.json(results);
  });
};

// Criar novo ritual
exports.criarRitual = (req, res) => {
  const { titulo, categoria, conteudo } = req.body;
  const usuarioId = req.usuario.id;

  if (!titulo || !conteudo) {
    return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios' });
  }

  const query = 'INSERT INTO rituais (usuario_id, titulo, categoria, conteudo) VALUES (?, ?, ?, ?)';
  conexao.query(query, [usuarioId, titulo, categoria, conteudo], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao salvar ritual' });
    }
    res.status(201).json({ 
      mensagem: 'Ritual salvo com sucesso! ✨', 
      ritual: { id: result.insertId, usuario_id: usuarioId, titulo, categoria, conteudo } 
    });
  });
};

// Deletar ritual
exports.deletarRitual = (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  const query = 'DELETE FROM rituais WHERE id = ? AND usuario_id = ?';
  conexao.query(query, [id, usuarioId], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao deletar ritual' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Ritual não encontrado ou permissão negada' });
    }
    res.json({ mensagem: 'Ritual removido com sucesso!' });
  });
};