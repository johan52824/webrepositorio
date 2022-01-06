let _authenticationService = null;

class AuthenticationController {
    constructor ({ AuthenticationService }) {
        _authenticationService = AuthenticationService;
    }

    async login (request, response, next) {
        try {
            const { username, password, keepLogin } = request.body;
            const token = await _authenticationService.login(username, password, keepLogin);
            return response.status(200).send(token);
        } catch (error) {
            next(error);
        }
    }

    async checkCurrentUser (request, response, next) {
        try {
            const authorization = request.get('authorization');
            const token = await _authenticationService.checkCurrentUser(authorization);
            return response.status(200).send(token);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthenticationController;
