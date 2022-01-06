const { response } = require('express');
const { Pensum } = require('../models/');

const GetPensum = async (req, res = response) => {

    const respuesta = await Pensum.find();

    return res.status(200).json(respuesta);
}

const SavePensum = async (req, res = response) => {

    const { carrera } = req.body
    
    const newPensum = new Pensum(req.body);
    
    const responseSave = await newPensum.save();

    res.status(200).send('Pensum '+carrera+' guardada');
}


module.exports = {
    GetPensum, 
    SavePensum
};