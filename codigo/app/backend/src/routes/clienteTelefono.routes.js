const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/clienteTelefono.controller');

router.get('/clientes', ctrl.getClientes);
router.get('/codigos', ctrl.getCodigos);

router.get('/', ctrl.getTelefonos);
router.post('/', ctrl.createTelefono);
router.put('/:id', ctrl.updateTelefono);
router.delete('/:id', ctrl.deleteTelefono);

module.exports = router;