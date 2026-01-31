const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/catalogoServicios.controller');

router.get('/', ctrl.getServicios);
router.post('/', ctrl.createServicio);
router.put('/:id', ctrl.updateServicio);
router.delete('/:id', ctrl.deleteServicio);

module.exports = router;