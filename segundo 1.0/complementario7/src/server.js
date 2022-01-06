const express = require('express');
const cors = require('cors');

const { DBConection } = require('./database');

class Server
{
    constructor(){
        this.app = express();
        this.port = process.env.PORT_DEV;

        this.conectDB();
        this.middleware();
        this.routes();
    }

    async conectDB(){
        await DBConection();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/api/v1/comunity', require('./routes/comunity.routes') );
        this.app.use('/api/v1/personal-facu', require('./routes/personal.routes') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`This server is running in http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;