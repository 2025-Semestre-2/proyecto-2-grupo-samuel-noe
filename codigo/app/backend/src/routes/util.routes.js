const { Router } = require('express');
const router = Router();
const { getCodigosPais } = require('../controllers/util.controller');

router.get('/codigos-pais', getCodigosPais);

module.exports = router;