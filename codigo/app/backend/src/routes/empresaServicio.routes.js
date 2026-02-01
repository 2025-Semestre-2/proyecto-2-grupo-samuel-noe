const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/empresaServicio.controller');

router.get('/empresas', ctrl.getEmpresas);
router.get('/servicios', ctrl.getServicios);

router.get('/', ctrl.getRelaciones);
router.post('/', ctrl.createRelacion);
router.put('/:id', ctrl.updateRelacion);
router.delete('/:id', ctrl.deleteRelacion);

module.exports = router;