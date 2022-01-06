module.exports = {
    loggerMiddleware: require('./logger.middleware'),
    notFoundMiddleware: require('./404.middleware'),
    errorMiddleware: require('./error.middleware')
};
