const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { hashSync, genSaltSync } = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    name: String
});

// Hooks
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    const salt = genSaltSync(10);

    const passwordHashed = hashSync(user.password, salt);

    user.password = passwordHashed;

    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.password === undefined) {
        delete this._update.password;
    } else {
        const salt = genSaltSync(10);
        const passwordHashed = hashSync(this._update.password, salt);
        this._update.password = passwordHashed;
    }

    next();
});

// Plugins
userSchema.plugin(uniqueValidator);

module.exports = model('user', userSchema);
