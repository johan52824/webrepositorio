const { Router } = require('express');

const { tokenMiddleware } = require('../middlewares');

module.exports = function ({ PaperController }) {
    const router = Router();

    router.get('/', PaperController.get);
    router.post('/', tokenMiddleware, PaperController.create);
    router.patch('/:paperId', tokenMiddleware, PaperController.update);
    router.delete('/:paperId', tokenMiddleware, PaperController.delete);

    return router;
};
