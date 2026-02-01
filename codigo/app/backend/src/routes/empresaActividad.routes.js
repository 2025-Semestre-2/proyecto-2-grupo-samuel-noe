const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/empresaActividad.controller');

router.get('/empresas', ctrl.getEmpresas);
router.get('/actividades', ctrl.getActividades);

router.get('/', ctrl.getRelaciones);
router.post('/', ctrl.createRelacion);
router.put('/:id', ctrl.updateRelacion);
router.delete('/:id', ctrl.deleteRelacion);

module.exports = router;