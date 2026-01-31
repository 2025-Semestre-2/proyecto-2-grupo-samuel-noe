const { Router } = require('express');
const router = Router();
const { getHabitaciones, createHabitacion } = require('../controllers/habitacion.controller');

router.get('/', getHabitaciones);
router.post('/', createHabitacion);

module.exports = router;