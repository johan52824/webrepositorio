const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let _userService = null;
let _config = null;

class AuthenticationService {
    constructor ({ UserService, config }) {
        _userService = UserService;
        _config = config;
    }

    async login (username, password, keepLogin) {
        if (!password) {
            const error = new Error();
            error.status = 400;
            error.message = 'Password not provided';
            error.name = 'CastError';
            throw error;
        }

        const user = await _userService.getUserByUsername(username);
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const error = new Error();
            error.status = 400;
            error.message = 'Invalid user or password';
            error.name = 'CastError';
            throw error;
        }

        const dataForToken = {
            userId: user._id,
            username: user.username
        };

        let expiresIn = {
            expiresIn: 60 * 60 * 24 * 7
        };

        if (keepLogin) expiresIn = {};

        const token = jwt.sign(dataForToken, _config.SECRET_JWT, expiresIn);

        return {
            username: user.username,
            name: user.name,
            expiresIn: expiresIn.expiresIn === undefined ? undefined : Date.now() + (expiresIn.expiresIn * 1000),
            token
        };
    }

    async checkCurrentUser (authorization) {
        let token = null;
        let decodedToken = null;

        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
            decodedToken = jwt.verify(token, _config.SECRET_JWT);
        }

        if (!token || !decodedToken.userId) {
            const error = new Error();
            error.status = 401;
            error.message = 'Token missing or invalid';
            error.name = 'JsonWebTokenError';
            throw error;
        }

        const { userId } = decodedToken;

        const user = await _userService.get(userId);

        const tokenExpire = decodedToken.exp === undefined ? undefined : decodedToken.exp * 1000;

        return {
            username: user.username,
            name: user.name,
            expiresIn: tokenExpire,
            token
        };
    }
}

module.exports = AuthenticationService;
