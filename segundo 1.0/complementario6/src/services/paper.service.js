const { saveFile } = require('../helpers');

const BaseService = require('./base.service');

let _paperRepository = null;

class PaperService extends BaseService {
    constructor ({ PaperRepository }) {
        super(PaperRepository);
        _paperRepository = PaperRepository;
    }

    // Create Override
    async create (paper) {
        const { document } = paper;

        if (!document) {
            const error = new Error();
            error.message = 'Document not provided';
            error.status = 400;
            error.name = 'CastError';
            throw error;
        }

        const re = /\.(pdf|docx)$/i;

        if (!re.test(document.name)) {
            const error = new Error();
            error.message = 'File extension not supported';
            error.status = 400;
            error.name = 'CastError';
            throw error;
        }

        const { documentUrl, imageThumbnailUrl } = await saveFile(document);

        paper.documentUrl = documentUrl;
        paper.imageThumbnailUrl = imageThumbnailUrl;

        delete paper.document;

        return await super.create(paper);
    }

    // Update Override

    async update (paperId, paper) {
        const { title, authors, excerpt } = paper;

        if (title === undefined && authors === undefined && excerpt === undefined) {
            const error = new Error();
            error.status = 400;
            error.message = 'Content missing';
            error.name = 'CastError';
            throw error;
        }

        return await super.update(paperId, paper);
    }

    async searchPaperByTitle (title) {
        return await _paperRepository.searchPaperByTitle(title);
    }
}

module.exports = PaperService;
