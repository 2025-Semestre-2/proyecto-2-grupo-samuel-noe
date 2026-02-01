const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/cliente.controller');

router.get('/', ctrl.getClientes);
router.post('/', ctrl.createCliente);
router.put('/:id', ctrl.updateCliente);
router.delete('/:id', ctrl.deleteCliente);

module.exports = router;