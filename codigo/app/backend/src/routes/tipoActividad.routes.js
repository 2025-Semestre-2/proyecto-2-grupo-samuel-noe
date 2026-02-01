const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/tipoActividad.controller');

router.get('/', ctrl.getTiposActividad);
router.post('/', ctrl.createTipoActividad);
router.put('/:id', ctrl.updateTipoActividad);
router.delete('/:id', ctrl.deleteTipoActividad);

module.exports = router;