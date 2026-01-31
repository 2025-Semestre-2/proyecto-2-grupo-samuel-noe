const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/recreacion.controller');

// Rutas para empresas de recreación
router.get('/empresas', ctrl.getEmpresas);
router.post('/empresas', ctrl.createEmpresa);
router.put('/empresas/:id', ctrl.updateEmpresa);
router.delete('/empresas/:id', ctrl.deleteEmpresa);

// Rutas para actividades
router.get('/actividades', ctrl.getActividades);
router.post('/actividades', ctrl.createActividad);
router.put('/actividades/:id', ctrl.updateActividad);
router.delete('/actividades/:id', ctrl.deleteActividad);

module.exports = router;