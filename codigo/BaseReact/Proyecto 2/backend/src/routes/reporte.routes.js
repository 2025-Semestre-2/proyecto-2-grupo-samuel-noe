const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/reporte.controller');

router.post('/ocupacion', ctrl.getOcupacion);
router.get('/edades', ctrl.getRangoEdades);
router.post('/facturacion', ctrl.getFacturacion);

module.exports = router;