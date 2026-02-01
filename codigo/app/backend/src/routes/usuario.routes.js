const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/usuario.controller');

router.get('/', ctrl.getUsuarios);
router.post('/', ctrl.createUsuario);
router.put('/:id', ctrl.updateUsuario);
router.delete('/:id', ctrl.deleteUsuario);

module.exports = router;