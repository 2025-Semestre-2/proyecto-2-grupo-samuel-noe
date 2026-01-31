const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/tipoHabitacion.controller');

router.get('/', ctrl.getTipos);
router.post('/', ctrl.createTipo);
router.put('/:id', ctrl.updateTipo);
router.delete('/:id', ctrl.deleteTipo);

module.exports = router;