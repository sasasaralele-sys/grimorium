const express = require('express');
const router = express.Router();
const tematicoController = require('../controllers/tematicoController');
const auth = require('../middlewares/autenticarToken');
const verificarToken = auth.verificarToken || auth;

router.get('/rodadoano', verificarToken, tematicoController.listarRodaDoAno);
router.get('/correspondencias', verificarToken, tematicoController.listarCorrespondencias);
router.get('/diario', verificarToken, tematicoController.listarDiario);
router.post('/diario', verificarToken, tematicoController.criarEntradaDiario);

module.exports = router;