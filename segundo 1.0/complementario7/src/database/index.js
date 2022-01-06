const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');

const DBConection = async () => {
    try{
        await mongoose.connect(MONGO_URL );
        
    }catch(err){
        console.log(err);
        throw new Error("Error to conect database");
    }
};

module.exports = { DBConection };