const { createContainer, asClass, asValue, asFunction } = require('awilix');
const config = require('../config');

// Importar enrutador
const Routes = require('../routes');
// Importar modelos
const { User, Paper, Author } = require('../models');
// Importar repositorios
const { UserRepository, AuthorRepository, PaperRepository } = require('../repositories');
// Importar servicios
const { UserService, AuthorService, PaperService, AuthenticationService } = require('../services');
// Importar controladores
const { UserController, AuthorController, PaperController, AuthenticationController } = require('../controllers');
// Importar rutas
const { userRoutes, authorRoutes, paperRoutes, authenticationRoutes } = require('../routes/index.routes');

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
    UserRepository: asClass(UserRepository).singleton(),
    AuthorRepository: asClass(AuthorRepository).singleton(),
    PaperRepository: asClass(PaperRepository).singleton()
}).register({
    UserService: asClass(UserService).singleton(),
    AuthorService: asClass(AuthorService).singleton(),
    PaperService: asClass(PaperService).singleton(),
    AuthenticationService: asClass(AuthenticationService).singleton()
}).register({
    UserController: asClass(UserController.bind(UserController)).singleton(),
    AuthorController: asClass(AuthorController.bind(AuthorController)).singleton(),
    PaperController: asClass(PaperController.bind(PaperController)).singleton(),
    AuthenticationController: asClass(AuthenticationController.bind(AuthenticationController)).singleton()
}).register({
    userRoutes: asFunction(userRoutes).singleton(),
    authorRoutes: asFunction(authorRoutes).singleton(),
    paperRoutes: asFunction(paperRoutes).singleton(),
    authenticationRoutes: asFunction(authenticationRoutes).singleton()
});

module.exports = container;
