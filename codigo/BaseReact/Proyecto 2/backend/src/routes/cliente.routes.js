const { Router } = require('express');
const router = Router();
const { getClientes, createCliente } = require('../controllers/cliente.controller');

router.get('/', getClientes);
router.post('/', createCliente);

module.exports = router;