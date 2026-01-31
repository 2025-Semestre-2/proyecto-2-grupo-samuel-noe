const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/reservacion.controller');

router.post('/', ctrl.crearReserva);
router.put('/checkout', ctrl.realizarCheckout);
router.get('/facturas', ctrl.getFacturas);

module.exports = router;