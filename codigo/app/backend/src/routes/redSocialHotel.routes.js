const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/redSocialHotel.controller');

router.get('/catalogo', ctrl.getCatalogoRedes);

router.get('/', ctrl.getRedesHotel);
router.post('/', ctrl.createRedHotel);
router.put('/:id', ctrl.updateRedHotel);
router.delete('/:id', ctrl.deleteRedHotel);

module.exports = router;