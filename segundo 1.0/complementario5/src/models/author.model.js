const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true,
        unique: true
    },
    papers: [{
        type: Schema.Types.ObjectId,
        ref: 'paper'
    }]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

// Plugins
authorSchema.plugin(uniqueValidator);

module.exports = model('author', authorSchema);
