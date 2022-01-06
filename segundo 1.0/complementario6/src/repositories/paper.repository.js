const BaseRepository = require('./base.repository');

let _paper = null;

class PaperRepository extends BaseRepository {
    constructor ({ Paper }) {
        super(Paper);
        _paper = Paper;
    }

    async searchPaperByTitle (title) {
        const re = new RegExp(title, 'i');
        return await _paper.find({ title: re });
    }
}

module.exports = PaperRepository;
