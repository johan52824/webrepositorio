class BaseService {
    constructor (repository) {
        this.repository = repository;
    }

    // get
    async get (id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'ID debe ser enviado';
            error.name = 'CastError';
            throw error;
        }

        const currentEntity = await this.repository.get(id);

        if (!currentEntity) {
            const error = new Error();
            error.name = 'EntityNotFound';
            error.status = 404;
            error.message = 'Entidad no encontrada';
            throw error;
        }

        return currentEntity;
    }

    // getAll
    async getAll () {
        return await this.repository.getAll();
    }

    // create
    async create (entity) {
        return await this.repository.create(entity);
    }

    // update
    async update (id, entity) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'ID debe ser enviado';
            error.name = 'CastError';
            throw error;
        }

        const entityUpdated = await this.repository.update(id, entity);

        if (!entityUpdated) {
            const error = new Error();
            error.status = 404;
            error.message = 'Entity not found, couldn\'t update.';
            error.name = 'EntityNotFound';
            throw error;
        }

        return entityUpdated;
    }

    // delete
    async delete (id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'ID debe ser enviado';
            error.name = 'CastError';
            throw error;
        }

        const entity = await this.repository.delete(id);

        if (!entity) {
            const error = new Error();
            error.status = 404;
            error.message = 'Entity not found, couldn\'t delete.';
            error.name = 'EntityNotFound';
            throw error;
        }

        return entity;
    }
}

module.exports = BaseService;
