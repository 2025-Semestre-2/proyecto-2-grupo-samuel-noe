const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/reservacion.controller');

router.get('/listas', ctrl.getListas);
router.get('/', ctrl.getReservaciones);
router.post('/', ctrl.createReservacion);
router.put('/:id', ctrl.updateReservacion);
router.delete('/:id', ctrl.deleteReservacion);

module.exports = router;