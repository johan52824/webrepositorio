const { model, Schema } = require('mongoose');

const paperSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: Schema.Types.ObjectId,
        ref: 'author'
    }],
    document_url: {
        type: String,
        required: true
    },
    image_preview_url: {
        type: String,
        required: true
    }
});

module.exports = model('paper', paperSchema);
