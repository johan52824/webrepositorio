const { reponse } = require('express');
const { Personal } = require('../models/');


const GetPersonalFacu = async (req, res=response)=>{

    const respuesta = await Personal.find();

    console.log(respuesta);
    return res.status(200).json(respuesta)
};


const InsertPersonalFacu = async (req, res = response ) => {
    
    const newPersonal = new Personal( req.body );
    const save = await newPersonal.save();

    res.status(200).send("Personal de Facultad guardado");

}

module.exports={
    GetPersonalFacu,
    InsertPersonalFacu
};