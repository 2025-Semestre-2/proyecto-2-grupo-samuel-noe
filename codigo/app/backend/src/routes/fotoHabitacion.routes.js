const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/fotoHabitacion.controller');

router.get('/tipos', ctrl.getTiposHabitacion);

router.get('/', ctrl.getFotos);
router.post('/', ctrl.createFoto);
router.put('/:id', ctrl.updateFoto);
router.delete('/:id', ctrl.deleteFoto);

module.exports = router;