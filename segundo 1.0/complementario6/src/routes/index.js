const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Importar Middlewares
const { loggerMiddleware, notFoundMiddleware, errorMiddleware } = require('../middlewares');

module.exports = ({ userRoutes, authorRoutes, paperRoutes, authenticationRoutes, config }) => {
    const router = express.Router();
    const apiRoutes = express.Router();

    // Middlewares
    apiRoutes.use(express.json());
    apiRoutes.use(cors());
    apiRoutes.use(fileUpload({ createParentPath: true }));

    // Log Middlewares
    apiRoutes.use(loggerMiddleware);

    // Api Routes
    apiRoutes.use('/user', userRoutes);
    apiRoutes.use('/author', authorRoutes);
    apiRoutes.use('/paper', paperRoutes);
    apiRoutes.use('/auth', authenticationRoutes);

    // Router
    router.use('/api/v2', apiRoutes);

    // Static
    router.use(express.static(config.PUBLIC_PATH));

    // Middlewares logicos
    router.use(errorMiddleware);
    router.use(notFoundMiddleware);

    return router;
};
