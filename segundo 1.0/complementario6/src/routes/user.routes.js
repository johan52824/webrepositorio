const { Router } = require('express');

const { tokenMiddleware } = require('../middlewares');

module.exports = function ({ UserController }) {
    const router = Router();

    router.get('/', UserController.get);
    router.post('/', UserController.create);
    router.patch('/:userId', tokenMiddleware, UserController.update);
    router.delete('/:userId', tokenMiddleware, UserController.delete);

    return router;
};
