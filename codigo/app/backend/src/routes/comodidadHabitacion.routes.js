const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/comodidadHabitacion.controller');

router.get('/tipos', ctrl.getTiposHabitacion);

router.get('/', ctrl.getComodidades);
router.post('/', ctrl.createComodidad);
router.put('/:id', ctrl.updateComodidad);
router.delete('/:id', ctrl.deleteComodidad);

module.exports = router;