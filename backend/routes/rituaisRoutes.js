const express = require('express');
const router = express.Router();
const ritualController = require('../controllers/rituaisController');
const { verificarToken } = require('../middlewares/autenticarToken');

router.get('/', verificarToken, ritualController.listarRituais);
router.post('/', verificarToken, ritualController.criarRitual);
router.delete('/:id', verificarToken, ritualController.deletarRitual);

module.exports = router;