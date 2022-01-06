const { Router, json } = require('express');
const cors = require('cors');

// Importar Middlewares
const { loggerMiddleware, notFoundMiddleware, errorMiddleware } = require('../middlewares');

module.exports = ({ userRoutes }) => {
    const router = Router();
    const apiRoutes = Router();

    // Middlewares
    apiRoutes.use(json());
    apiRoutes.use(cors());

    // Log Middlewares
    apiRoutes.use(loggerMiddleware);

    // Api Routes
    apiRoutes.use('/user', userRoutes);

    // Router
    router.use('/v2/api', apiRoutes);

    // Middlewares logicos
    router.use(errorMiddleware);
    router.use(notFoundMiddleware);

    return router;
};
