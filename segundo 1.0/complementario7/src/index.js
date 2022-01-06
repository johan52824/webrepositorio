const Server = require('./server');
const fs = require('fs');

const { InitWithSession, InitWithOutSession } = require('./middlewares').Sessions;

const server = new  Server();
const SESSION_FILE = './session.json';


( fs.existsSync( SESSION_FILE ) ) ? InitWithSession() : InitWithOutSession() ;
server.listen();