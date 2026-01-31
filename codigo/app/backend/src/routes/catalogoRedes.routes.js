const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/catalogoRedes.controller');

router.get('/', ctrl.getCatalogo);
router.post('/', ctrl.createRed);
router.put('/:id', ctrl.updateRed);
router.delete('/:id', ctrl.deleteRed);

module.exports = router;