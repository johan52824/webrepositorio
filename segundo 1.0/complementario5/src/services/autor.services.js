const AutorModel = require('../models/autor.model')


//filtro de manera Query String: ?filter=<valor -->url.parse(req.url, true).query;
exports.findAll = async (nombre) =>{//regresa todos los objetos
    try{
        return await AutorModel.find({ nombre }).exec();

    } catch(error) {
        throw error
    }
}


//filtro de manera /:param -- req.params
exports.findById = async (id) =>{ // es una manera de exportar funciones como el module.exports
    try{
        return await AutorModel.findById(id).exec();

    } catch(error) {
        throw error
    }
}



exports.createAutor = async (autorInfo) => {

    try{
        const newAutor = await new AutorModel({
            ...autorInfo
        })
        return await newAutor.save();

    } catch(error) {
        throw error
    }

    
}   