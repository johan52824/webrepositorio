let _userService = null;

class UserController {
    constructor ({ UserService }) {
        _userService = UserService;
    }

    // get
    async get (request, response, next) {
        try {
            const { userId, username } = request.query;

            if (userId) {
                const user = await _userService.get(userId);
                return response.status(200).send(user);
            }

            if (username) {
                const user = await _userService.getUserByUsername(username);
                return response.status(200).send(user);
            }

            const users = await _userService.getAll();

            return response.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }

    // create
    async create (request, response, next) {
        try {
            const { username, name, password } = request.body;

            const user = {
                username,
                name,
                password
            };

            const userCreated = await _userService.create(user);
            response.status(201).send(userCreated);
        } catch (error) {
            next(error);
        }
    }

    // update
    async update (request, response, next) {
        try {
            const { name, password } = request.body;

            const user = {
                name,
                password
            };

            if (name === undefined) delete user.name;

            const { userId } = request.params;

            const userUpdated = await _userService.update(userId, user);

            response.status(200).send(userUpdated);
        } catch (error) {
            next(error);
        }
    }

    // delete
    async delete (request, response, next) {
        try {
            const { userId } = request.params;
            const userDeleted = await _userService.delete(userId);
            response.send(userDeleted);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
