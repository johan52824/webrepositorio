const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { ListenMessage } = require('./eventsMessage');

let client;                                             //activa una cliente por chat
let sessionData;                                        //obtiene la session actual
let legend = null;                                      //almacena en que tipo de opcion esta el usuario
let optionsCurrent = [];                                //que otras opciones tenemos despues de la actualn
const SESSION_FILE = '../../session.json';


const InitWithSession = () => {

    console.log(`Comprobando sesión. Espere unos segundos...`);
    
    sessionData = require(SESSION_FILE);   

    client = new Client( {
        session : sessionData
    } )

    client.on( 'ready', () => {
        console.log("¡Sesión Iniciada exitosamente!");
        ListenMessage(client, legend, optionsCurrent);
    } );

    client.on('auth_failure', () => {
        console.log(`
        ==========================================================
                        ERROR AL AUTENTIFICAR
                    Generando un nuevo código QR
        ==========================================================
        `);

        fs.unlinkSync( './session.json' );
        InitWithOutSession();

    })

    client.initialize();

}


const InitWithOutSession = () => {

    console.log(`Creando código QR...\n`);

    client = new Client();

    client.on('qr', qr => {
        qrcode.generate( qr, { small: true });
        console.log('Por favor escanea el código QR desde tu telefono\n');
    });

    client.on('ready', () => {
        console.log('¡Sesión iniciada!');
        ListenMessage(client);
    });

    client.on('auth_failure', () => {
        console.log(`
        =============================================================
                            ERROR AL AUTENTIFICAR
        =============================================================`);
    })


    client.on('authenticated', (session) => {  

        sessionData = session;

        fs.writeFile( './session.json', JSON.stringify(session), function (err) {
            if (err) {
                return console.log(err);
            }
            return console.log("guardado");
        });

    });

    client.initialize();

}


module.exports = { InitWithSession, InitWithOutSession };