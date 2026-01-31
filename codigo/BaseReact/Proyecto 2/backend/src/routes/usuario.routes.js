const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/usuario.controller');

router.get('/', ctrl.getUsuarios);
router.post('/', ctrl.createUsuario);
router.put('/:usuario', ctrl.updateUsuario);
router.delete('/:usuario', ctrl.deleteUsuario);

module.exports = router;