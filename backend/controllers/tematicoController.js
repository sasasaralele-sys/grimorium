const conexao = require('../database/conexao');

exports.listarRodaDoAno = (req, res) => {
  conexao.query('SELECT * FROM rodadoano', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar Roda do Ano' });
    res.json(results);
  });
};

exports.listarCorrespondencias = (req, res) => {
  conexao.query('SELECT * FROM correspondencias', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar correspondências' });
    res.json(results);
  });
};

exports.listarDiario = (req, res) => {
  const usuarioId = req.usuario.id;
  const query = 'SELECT * FROM diario_calendario WHERE usuario_id = ? ORDER BY data_anotacao DESC';
  conexao.query(query, [usuarioId], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar diário' });
    res.json(results);
  });
};

exports.criarEntradaDiario = (req, res) => {
  const { data_anotacao, humor_energia, fase_lunar, anotacao } = req.body;
  const usuarioId = req.usuario.id;

  if (!data_anotacao || !anotacao) {
    return res.status(400).json({ erro: 'Data e anotação são obrigatórias' });
  }

  const query = 'INSERT INTO diario_calendario (usuario_id, data_anotacao, humor_energia, fase_lunar, anotacao) VALUES (?, ?, ?, ?, ?)';
  conexao.query(query, [usuarioId, data_anotacao, humor_energia, fase_lunar, anotacao], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao salvar no diário' });
    res.status(201).json({ mensagem: 'Página do diário salva! 🌙', id: result.insertId });
  });
};