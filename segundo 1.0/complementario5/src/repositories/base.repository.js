class BaseRepository {
    constructor (model) {
        this.model = model;
    }

    // Get single
    async get (id) {
        return await this.model.findById(id);
    }

    // Get all
    async getAll () {
        return await this.model.find();
    }

    // Create
    async create (entity) {
        return await this.model.create(entity);
    }

    // Update
    async update (id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true });
    }

    // Delete
    async delete (id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;
