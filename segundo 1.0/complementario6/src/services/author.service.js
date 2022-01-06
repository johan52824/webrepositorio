const { checkIdentification } = require('../helpers');

const BaseService = require('./base.service');

let _authorRepository = null;

class AuthorService extends BaseService {
    constructor ({ AuthorRepository }) {
        super(AuthorRepository);
        _authorRepository = AuthorRepository;
    }

    // Create Override

    async create (author) {
        const { identification } = author;

        const isValidIdentification = checkIdentification(identification);

        if (!isValidIdentification) {
            const error = new Error();
            error.status = 400;
            error.message = 'Bad identification provided';
            error.name = 'CastError';
            throw error;
        }

        return await super.create(author);
    }

    // Update Override

    async update (authorId, author) {
        const { firstName, lastName, papers } = author;

        if (firstName === undefined && lastName === undefined && papers === undefined) {
            const error = new Error();
            error.status = 400;
            error.message = 'Content missing';
            error.name = 'CastError';
            throw error;
        }

        return await super.update(authorId, author);
    }

    async getAuthorByIdentification (identificacion) {
        const author = await _authorRepository.getAuthorByIdentification(identificacion);

        if (!author) {
            const error = new Error();
            error.status = 404;
            error.message = 'Author not found.';
            error.name = 'EntityNotFound';
            throw error;
        }

        return author;
    }

    async searchByIdentification (identificacion) {
        const authors = await _authorRepository.searchByIdentification(identificacion);

        if (authors.length === 0) {
            const error = new Error();
            error.status = 404;
            error.message = 'Authors not found.';
            error.name = 'EntityNotFound';
            throw error;
        }

        return authors;
    }

    async searchByFirstName (name) {
        const authors = await _authorRepository.searchByFirstName(name);

        if (authors.length === 0) {
            const error = new Error();
            error.status = 404;
            error.message = 'Authors not found.';
            error.name = 'EntityNotFound';
            throw error;
        }

        return authors;
    }

    async searchByLastName (name) {
        const authors = await _authorRepository.searchByLastName(name);

        if (authors.length === 0) {
            const error = new Error();
            error.status = 404;
            error.message = 'Authors not found.';
            error.name = 'EntityNotFound';
            throw error;
        }

        return authors;
    }
}

module.exports = AuthorService;
