require('dotenv').config();
const path = require('path');

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SECRET_CONVERT_API: process.env.SECRET_CONVERT_API,
    SECRET_JWT: process.env.SECRET_JWT,
    PUBLIC_PATH: path.join(__dirname + '../../../public/')
};
