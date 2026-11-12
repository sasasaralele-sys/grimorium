const express = require('express');
const router = express.Router();
const ritualController = require('../controllers/rituaisController');
const { verificarToken } = require('../middlewares/autenticarToken');
const { verificarAdmin } = require('../middlewares/somenteAdmin');

router.get('/', verificarToken, ritualController.listarRituais);
router.get('/oficiais', verificarToken, ritualController.listarOficiais);
router.post('/', verificarToken, ritualController.criarRitual);
router.post('/oficial', verificarToken, verificarAdmin, ritualController.criarOficial);
router.delete('/:id', verificarToken, ritualController.deletarRitual);

module.exports = router;