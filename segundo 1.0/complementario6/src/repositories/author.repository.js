const BaseRepository = require('./base.repository');

let _author = null;

class AuthorRepository extends BaseRepository {
    constructor ({ Author }) {
        super(Author);
        _author = Author;
    }

    async getAuthorByIdentification (identification) {
        return await _author.findOne({ identification });
    }

    async searchByIdentification (identificacion) {
        const re = new RegExp(`^${identificacion}`, 'i');
        return await _author.find({ identification: re });
    }

    async searchByFirstName (name) {
        const re = new RegExp(name, 'i');
        return await _author.find({ firstName: re });
    }

    async searchByLastName (name) {
        const re = new RegExp(name, 'i');
        return await _author.find({ lastName: re });
    }
}

module.exports = AuthorRepository;
