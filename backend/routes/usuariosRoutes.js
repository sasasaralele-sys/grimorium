const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/autenticarToken');
const { verificarAdmin } = require('../middlewares/somenteAdmin');

router.get('/', verificarToken, verificarAdmin, usuariosController.listarUsuarios);
router.put('/:id/nivel', verificarToken, verificarAdmin, usuariosController.alterarNivel);

module.exports = router;