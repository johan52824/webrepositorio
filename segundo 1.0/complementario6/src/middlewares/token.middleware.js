const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_JWT } = require('../config');

module.exports = async (request, response, next) => {
    const authorization = request.get('authorization');
    let token = null;
    let decodedToken = null;

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        decodedToken = jwt.verify(token, SECRET_JWT);
    }

    if (!token || !decodedToken.userId) {
        return response.status(401).send({
            status: 401,
            message: 'Token missing or invalid'
        });
    }

    const { userId } = decodedToken;
    const user = await User.findById(userId);

    if (!user) {
        return status(401).send({
            status: 401,
            message: 'Invalid user'
        });
    }

    next();
};
