const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/habitacion.controller');

router.get('/tipos', ctrl.getTiposHabitacion);

router.get('/', ctrl.getHabitaciones);
router.post('/', ctrl.createHabitacion);
router.put('/:id', ctrl.updateHabitacion);
router.delete('/:id', ctrl.deleteHabitacion);

module.exports = router;