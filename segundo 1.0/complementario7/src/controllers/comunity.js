const { response } = require('express');
const { Comunity } = require('../models/');

const GetComunity = async (req, res = response) => {

    const respuesta = await Comunity.find();

    return res.status(200).json(respuesta);
}


const GetComunityByName = async (req, res = response) => {
    const { name } = req.params;

    let filther = { name };

    const respuesta = await Comunity.find(filther);

    return res.status(200).json(respuesta);
}


const SaveComunity = async (req, res = response) => {
    
    const comunity = new Comunity(req.body);
    
    const responseSave = await comunity.save();

    res.status(200).send('Comunidad Guardada');
}


module.exports = {
    GetComunity, 
    GetComunityByName,
    SaveComunity
};