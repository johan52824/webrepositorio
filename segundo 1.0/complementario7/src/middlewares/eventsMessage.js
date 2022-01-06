const LoadResponse = require("./loadResponse");


const ListenMessage = (client, legend, optionsCurrent) => {

    client.on('message', (msg) => {
        const { from, to, body } = msg;
        
        const response = LoadResponse( body, legend, optionsCurrent );
        const { listMessage, leg , opts } = response;

        listMessage.map((message) => {            
            SendMessage(client, from, message);
        })

        legend = leg;
        optionsCurrent = opts;
        return;
    })

}

const SendMessage = ( client, to, msg ) => {
    client.sendMessage( to, msg );
}

module.exports = { ListenMessage };