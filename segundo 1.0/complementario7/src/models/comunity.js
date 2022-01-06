const { model, Schema } = require('mongoose');

const ComunitySchema = Schema(
    {
        "name": { 
            type: String, 
            require: [ true, "El Nombre es Requerido" ] 
        },
        "leader": [String],
        "email": {
            type: String,
            require: [true, "El email es requerido"],
            unique: true
        },
        "cell": { 
            type: Number, 
            require: [ true, "El número es necesario" ] 
        },
        "social_media": {
            type: Object
        }
    }
);

module.exports = model('Comunity', ComunitySchema);