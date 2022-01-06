const { Router } = require('express');
const { GetPersonalFacu, InsertPersonalFacu }=require('../controllers').Personal;

const router = Router();

router.get('/', GetPersonalFacu);

router.post('/', InsertPersonalFacu);


module.exports = router;