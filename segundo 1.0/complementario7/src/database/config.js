if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

module.exports = { 
    MONGO_URL : process.env.MONGO_URL,
    API_URL: process.env.API_URL
};