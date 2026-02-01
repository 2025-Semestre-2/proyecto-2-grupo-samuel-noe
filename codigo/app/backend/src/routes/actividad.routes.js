const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/actividad.controller');

router.get('/buscar', ctrl.searchActividades);

router.get('/', ctrl.getActividades);
router.post('/', ctrl.createActividad);
router.put('/:id', ctrl.updateActividad);
router.delete('/:id', ctrl.deleteActividad);

module.exports = router;