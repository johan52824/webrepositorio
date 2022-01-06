const { model, Schema } = require('mongoose');

const PersonalSchema = Schema(
    [
        {
            "academico" : [
                {
                    "cargo": {type:String},
                    "nombre": {type:String},
                    "titulo": [String]
                }
            ]
        },
          {
            "administrativo" : [
                {
                    "cargo": {type:String},
                    "nombre": {type:String},
                    "titulo": [String]
                }
            ]
        },
          {
            "vinculacion" : [
                {
                    "nombre": {type:String},
                    "titulo": [String]
                }
            ]
        },
          {
            "practicas pre-profesionales" : [
                {
                    "nombre": {type:String},
                    "titulo": [String]
                }
            ]
        },
          {
            "personal de Servicios" : [
                {
                    "nombre": {type:String}
                }
            ]
        }
    ]
);


module.exports = model ( 'Personal', PersonalSchema );
