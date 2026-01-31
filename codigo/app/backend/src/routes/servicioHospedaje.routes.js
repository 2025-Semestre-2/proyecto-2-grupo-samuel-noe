const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/servicioHospedaje.controller');

router.get('/catalogo', ctrl.getCatalogoServicios);

router.get('/', ctrl.getServiciosHotel);
router.post('/', ctrl.createServicioHotel);
router.put('/:id', ctrl.updateServicioHotel);
router.delete('/:id', ctrl.deleteServicioHotel);

module.exports = router;