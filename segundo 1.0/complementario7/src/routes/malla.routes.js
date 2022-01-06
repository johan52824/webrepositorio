const { Router } = require('express');
const { GetPensum, SavePensum } = require('../controllers').Pensum;

const router = Router();

router.get('/', GetPensum );

router.post('/', SavePensum );

module.exports = router;