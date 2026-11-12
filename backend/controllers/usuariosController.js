const conexao = require('../database/conexao');

// Listar todos os usuários (sem mostrar a senha)
exports.listarUsuarios = (req, res) => {
  const query = 'SELECT id, nome, email, nivel FROM usuarios';
  conexao.query(query, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    res.json(results);
  });
};

// Alterar nível do usuário (praticante <-> admin)
exports.alterarNivel = (req, res) => {
  const { id } = req.params;
  const { nivel } = req.body;

  if (nivel !== 'praticante' && nivel !== 'admin') {
    return res.status(400).json({ erro: 'Nível inválido' });
  }

  const query = 'UPDATE usuarios SET nivel = ? WHERE id = ?';
  conexao.query(query, [nivel, id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar nível' });
    res.json({ mensagem: `Nível atualizado para ${nivel} com sucesso!` });
  });
};