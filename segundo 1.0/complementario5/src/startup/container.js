const { createContainer, asClass, asValue, asFunction } = require('awilix');
const config = require('../config');

// Importar enrutador
const Routes = require('../routes');
// Importar modelos
const { User, Paper, Author } = require('../models');
// Importar repositorios
const { UserRepository } = require('../repositories');
// Importar servicios
const { UserService } = require('../services');
// Importar controladores
const { UserController } = require('../controllers');
// Importar rutas
const { userRoutes } = require('../routes/index.routes');

const app = require('./index');

const container = createContainer();

container.register({
    config: asValue(config),
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton()
}).register({
    User: asValue(User),
    Author: asValue(Author),
    Paper: asValue(Paper)
}).register({
    UserRepository: asClass(UserRepository).singleton()
}).register({
    UserService: asClass(UserService).singleton()
}).register({
    UserController: asClass(UserController.bind(UserController)).singleton()
}).register({
    userRoutes: asFunction(userRoutes).singleton()
});

module.exports = container;
