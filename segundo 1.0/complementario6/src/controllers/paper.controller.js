let _paperService = null;

class PaperController {
    constructor ({ PaperService }) {
        _paperService = PaperService;
    }

    // get
    async get (request, response, next) {
        try {
            const { search, paperId } = request.query;

            if (paperId) {
                const paper = await _paperService.get(paperId);
                return response.status(200).send(paper);
            }

            if (search) {
                const title = search.trim();
                const papers = await _paperService.searchPaperByTitle(title);
                return response.status(200).send(papers);
            }

            const papers = await _paperService.getAll();
            return response.status(200).send(papers);
        } catch (error) {
            next(error);
        }
    }

    // create
    async create (request, response, next) {
        try {
            const { title, authors, excerpt } = request.body;
            const { document } = request.files;

            const paper = {
                title,
                authors,
                document,
                excerpt
            };

            const paperCreated = await _paperService.create(paper);
            return response.status(200).send(paperCreated);
        } catch (error) {
            next(error);
        }
    }

    // update
    async update (request, response, next) {
        try {
            const { title, authors, excerpt } = request.body;
            const { paperId } = request.params;

            const paper = {
                title,
                excerpt,
                authors
            };

            if (title === undefined) delete paper.title;
            if (authors === undefined) delete paper.authors;
            if (excerpt === undefined) delete paper.excerpt;

            const paperUpdated = await _paperService.update(paperId, paper);

            return response.status(200).send(paperUpdated);
        } catch (error) {
            next(error);
        }
    }

    // delete
    async delete (request, response, next) {
        try {
            const { paperId } = request.params;
            const paperDeleted = await _paperService.delete(paperId);
            return response.status(200).send(paperDeleted);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PaperController;
