const { Router } = require('express');
const { GetComunity, GetComunityByName, SaveComunity } = require('../controllers').Comunity;


const router = Router();


router.get('/', GetComunity );

router.get('/:name', GetComunityByName );

router.post('/', SaveComunity );


module.exports = router;