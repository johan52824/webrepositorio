const express = require('express');

let _config = null;
let _router = null;

class Server {
    constructor ({ config, router }) {
        _config = config;
        _router = express().use(router);
    }

    start () {
        return new Promise(resolve => {
            _router.listen(_config.PORT, () => console.log('Aplicación funcionando en http://127.0.0.1:' + _config.PORT));
        });
    }
}

module.exports = Server;
