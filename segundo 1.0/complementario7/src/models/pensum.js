const { model, Schema } = require('mongoose');

const PensumSchema = Schema(
    {
        "carrera": { type: String, require: [true, "El Nombre de la carrera es Requerido"] },
        "materias": [
            {
                "nombre": { 
                    type: String, 
                    require: [true, "El nombre de la materia es necesario"] 
                },
                "codigo": { 
                    type: String, 
                    require: [true, "El código es requerido"], 
                    unique: true 
                },
                "credito": { 
                    type: Number, 
                    require: [true, "Credito necesario"] 
                },
                "nivel": { 
                    type: Number, 
                    require: [true, "El nivel es necesario"] 
                },
                "cadena": { type: String }
            }
        ]

    }
);

module.exports = model('Pensum', PensumSchema);