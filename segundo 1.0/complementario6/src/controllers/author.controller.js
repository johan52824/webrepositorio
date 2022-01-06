let _authorService = null;

class AuthorController {
    constructor ({ AuthorService }) {
        _authorService = AuthorService;
    }

    // get
    async get (request, response, next) {
        try {
            const { identification, searchIdentification, searchFirstName, searchLastName, authorId } = request.query;

            if (authorId) {
                const author = await _authorService.get(authorId);
                return response.status(200).send(author);
            }

            if (identification) {
                const author = await _authorService.getAuthorByIdentification(identification);
                return response.status(200).send(author);
            }

            if (searchIdentification) {
                const identification = searchIdentification;
                const authors = await _authorService.searchByIdentification(identification);
                return response.status(200).send(authors);
            }

            if (searchFirstName) {
                const name = searchFirstName;
                const authors = await _authorService.searchByFirstName(name);
                return response.status(200).send(authors);
            }

            if (searchLastName) {
                const name = searchLastName;
                const authors = await _authorService.searchByLastName(name);
                return response.status(200).send(authors);
            }

            const authors = await _authorService.getAll();
            return response.status(200).send(authors);
        } catch (error) {
            next(error);
        }
    }

    // create
    async create (request, response, next) {
        try {
            const { firstName, lastName, identification } = request.body;

            const author = {
                firstName,
                lastName,
                identification
            };

            const authorCreated = await _authorService.create(author);
            return response.status(201).send(authorCreated);
        } catch (error) {
            next(error);
        }
    }

    // update
    async update (request, response, next) {
        try {
            const { firstName, lastName, papers } = request.body;
            const { authorId } = request.params;

            const author = {
                firstName,
                lastName,
                papers
            };

            if (firstName === undefined) delete author.firstName;
            if (lastName === undefined) delete author.lastName;
            if (papers === undefined) delete author.papers;

            const authorUpdated = await _authorService.update(authorId, author);

            return response.status(200).send(authorUpdated);
        } catch (error) {
            next(error);
        }
    }

    // delete
    async delete (request, response, next) {
        try {
            const { authorId } = request.params;
            const authorDeleted = await _authorService.delete(authorId);
            return response.status(200).send(authorDeleted);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthorController;
