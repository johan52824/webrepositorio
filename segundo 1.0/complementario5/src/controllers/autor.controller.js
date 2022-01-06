//const { response } = require("express");
const url = require("url");
const { findAll, findById, createAutor } = require('../services/autor.services');

const genericResponse = {
    data: {}
}
//filtro de manera Query String: ?filter=<valor -->url.parse(req.url, true).query;
exports.findAll = async (req, res, next) =>{
    try{
        const { nombre } = url.parse(req.url, true).query;
        const autores = await findAll(nombre);
        const response = Object.assign({}, genericResponse,{data: {autores}})
        res.status(200).json(response).end();
    } catch(error){
        next(error)
    }
    
};

//filtro de manera /:param -- req.params
exports.findById = async (req, res, next) =>{ // es una manera de exportar funciones como el module.exports
    try{
        const {id} = req.params;
        const autor = await findById(id);
        const response = Object.assign({}, genericResponse,{data: {autor}})
        res.status(200).json(response).end();
    } catch(error){
        next(error)
    }
    
}

exports.createAutor = async (req, res) => {
    try{
        const {body} = req;
        const newAutor = await createAutor(body)
        const response = Object.assign({}, genericResponse,{data: {newAutor}})
        res.status(201).json(response).end();
    } catch(error){
        next(error)
    }
    

};