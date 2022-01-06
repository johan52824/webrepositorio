const { Router } = require('express');

const { tokenMiddleware } = require('../middlewares');

module.exports = function ({ AuthorController }) {
    const router = Router();

    router.get('/', AuthorController.get);
    router.post('/', tokenMiddleware, AuthorController.create);
    router.patch('/:authorId', tokenMiddleware, AuthorController.update);
    router.delete('/:authorId', tokenMiddleware, AuthorController.delete);

    return router;
};
