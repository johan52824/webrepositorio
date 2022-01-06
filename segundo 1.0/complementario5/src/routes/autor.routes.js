const { Router } = require("express");//importamos express
const router = new Router();
const url = require('url')
const { findAll,findById, createAutor } = require('../controllers/autor.controller')

router.get("/:id", findById);
router
    .get("/", findAll)
    .post("/", createAutor);



module.exports = router //exportamos la varialble router



