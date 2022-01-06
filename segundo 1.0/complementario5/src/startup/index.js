const express = require('express');

let _express = null;
let _config = null;

class Server {
    constructor ({ config, router }) {
        _config = config;
        _express = express().use(router);
    }

    start () {
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => console.log('Aplicación funcionando en http://127.0.0.1:' + _config.PORT));
        });
    }
}

module.exports = Server;
