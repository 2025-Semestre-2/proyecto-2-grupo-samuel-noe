const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/hospedaje.controller');

router.get('/', ctrl.getHoteles);
router.post('/', ctrl.createHotel);
router.put('/:id', ctrl.updateHotel);
router.delete('/:id', ctrl.deleteHotel);

module.exports = router;