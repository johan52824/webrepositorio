const BaseService = require('./base.service');

let _userRepository = null;

class UserService extends BaseService {
    constructor ({ UserRepository }) {
        super(UserRepository);
        _userRepository = UserRepository;
    }

    // Create Override

    async create (user) {
        const { username } = user;

        const re = /\s/g;

        if (re.test(username) || username.length === 0) {
            const error = new Error();
            error.status = 400;
            error.message = 'Username can\'t have any blank space or be empty';
            error.name = 'CastError';
            throw error;
        }

        return await super.create(user);
    }

    // Update Override

    async update (id, user) {
        const { password, name } = user;

        if (password === undefined && name === undefined) {
            const error = new Error();
            error.status = 400;
            error.message = 'Content missing';
            error.name = 'CastError';
            throw error;
        }

        return await super.update(id, user);
    }

    async getUserByUsername (username) {
        if (!username) {
            const error = new Error();
            error.status = 400;
            error.message = 'Username missing';
            error.name = 'CastError';
            throw error;
        }

        const user = await _userRepository.getUserByUsername(username);

        if (!user) {
            const error = new Error();
            error.status = 404;
            error.message = 'User not found';
            error.name = 'EntityNotFound';
            throw error;
        }

        return user;
    }
}

module.exports = UserService;
