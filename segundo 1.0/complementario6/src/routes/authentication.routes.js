const { Router } = require('express');

module.exports = function ({ AuthenticationController }) {
    const router = Router();

    router.post('/login', AuthenticationController.login);
    router.post('/check', AuthenticationController.checkCurrentUser);

    return router;
};
