const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/factura.controller');

router.get('/', ctrl.getFacturas);
router.post('/', ctrl.createFactura);
router.put('/:id', ctrl.updateFactura);
router.delete('/:id', ctrl.deleteFactura);

module.exports = router;