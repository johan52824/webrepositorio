const ERROR_HANDLERS = {

    CastError: (response, error) => response.status(400).send({ status: 400, message: error.message }),

    ValidationError: (response, error) => response.status(409).send({ status: 409, error: error.message }),

    JsonWebTokenError: (response, error) => response.status(401).send({ status: 401, error: error.message }),

    TokenExpiresError: (response, error) => response.staus(401).send({ status: 401, error: error.message }),

    EntityNotFound: (response, error) => response.status(404).send({ status: 404, error: error.message }),

    SyntaxError: (response, error) => response.status(400).send({ status: 400, error: error.message }),

    defaultError: (response, error) => response.status(500).send({ status: 500, error: error.message }).end()
};

module.exports = (error, request, response, next) => {
    if (error) {
        console.log(error.name);

        const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

        return handler(response, error);
    }

    next();
};
