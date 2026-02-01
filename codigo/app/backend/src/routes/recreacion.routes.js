const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/recreacion.controller');

router.get('/', ctrl.getEmpresas);
router.post('/', ctrl.createEmpresa);
router.put('/:id', ctrl.updateEmpresa);
router.delete('/:id', ctrl.deleteEmpresa);

module.exports = router;