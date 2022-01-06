const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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

// Hooks
authorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

// Plugins
authorSchema.plugin(uniqueValidator);

module.exports = model('author', authorSchema);
