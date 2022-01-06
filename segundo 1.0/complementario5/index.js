const container = require('./src/startup/container');

const server = container.resolve('app');
const { MONGO_URI } = container.resolve('config');

const mongoose = require('mongoose');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Conexión a base de datos realizada correctamente...');
        return server.start();
    })
    .catch(error => console.log(error));
