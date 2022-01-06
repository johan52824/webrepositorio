const axios = require('axios').default;

const { normalizeString ,buscarOptionsAct, dataLegend } = require('../controllers').ResponseChat;
const { API_URL } = require('../database/config');

const LoadResponse = ( body, legend, optionsCurrent ) => {
    const message = normalizeString(body);
    let messageToSend = [];                                 //que mensaje(s) se enviará
    
    message.map( (palabra) => {
        
        switch(palabra){

            case "hola":
                if(legend !== null){
                    return messageToSend = [ "Hola de Nuevo, recuerda que enviando *menu* puedes ver las opciones" ]
                }
                return messageToSend = ["Hola, Que tal!\nSoy FacciBot🤖, ¿En que puedo ayudarte?😉, puedo ayudarte con consultas relacionadas con la Facultad Ciencias Informáticas.\n\nEnvía *menu* para ver las opciones"]

            case "menu":

                legend = dataLegend.legend;
                optionsCurrent = buscarOptionsAct(legend, optionsCurrent)                
                
                return messageToSend = [ "Estas son las opciones que tengo para ti.\n1. Información sobre las comunidades\n2. Información de Personal Administrativo" ]
                                  
            case "salir":
                messageToSend =  ["Adios, ten buen resto del día. ¡Fue un placer haberte ayudado!😉"];
                legend = null;
                return optionsCurrent = [];
                
            default: 
                const convINT = parseInt(palabra);;

                if( isNaN( convINT ) ){
                    return messageToSend = [ 
                        "Disculpa no te entendi, te enteré mejor si ves mi menú de opciones.",
                        "Envía *menú* para ver las opciones"
                    ];
                }
                
                if( optionsCurrent.length === 0 ){
                    return messageToSend = [
                        "Lo siento😟, No tienes mas opciones para consultar",
                        "Prueba enviando *menu* para ver mis opciones de consulta 😏."
                    ]

                }else if( optionsCurrent.length > 1 ){

                    if( convINT > optionsCurrent.length || convINT < 1 ){
                        return messageToSend = [
                            `⚠️No tengo ninguna *opcion ${convINT}*⚠️. Ingresa la opción correcta.`
                        ];
                    }
                    
                    if( convINT === 1 ){

                        // const data = (async () => {
                        //     const response = await axios.get(API_URL+"/comunity");
                        //     let conct = "";

                        //     response.data.map((comunidad, index) => {
                        //         conct = conct+(index+1)+". "+comunidad.name+'\n';
                        //     })
                            
                        //     return conct;
                        // })();


                        legend = "LSt?=";
                        optionsCurrent = buscarOptionsAct(legend, optionsCurrent);

                        // data
                        //     .then(res => {
                        //         if(res){
                        //             return messageToSend = [
                        //                 `*Comunidades de Facultad*\n¿Sobre que comunidad quieres conocer?\n\n${res}`
                        //             ];
                        //         }
                        //     }).catch(err => console.log("err")) ;

                        
                        return messageToSend = [
                            `*Comunidades de Facultad*\n¿Sobre que comunidad quieres conocer?\n\n1. MantaRaya\n2. Electrofac`
                        ];

                    }if(convINT === 2){

                        return messageToSend = [
                            `El personal administrativo de la Facultad Ciencias Informáticas esta conformado por:\n(Datos ficticios - No oficiales en su totalidad)\n\nPersonal Académico:\n- Decana: Lic. Dolores Esperanza Muñoz Verduga, PhD.\n- Coordinador de Carrera: Ing. Rubén Darío Solórzano Cadena, Mg.\n- Comision Academica:\n   Ing. John Antonio\n   Cevallos Macías, Mg.\n   Ing. Winther Abel Molina Loor, Mg.\n\nPersonal Administrativo:\n- Secretaria General: Ing. Beatriz Leonor Fuentes Falcones\n- Ing. Dahiana Valeria Alvia Toala, Mg.\n- Lic. Angel Fermín Anchundia Cuenca\n- Ing. Martha Sebastiana Ávila Chávez\n- A.S. María José Cornejo Arteaga, Mg.\n\nVinculacion:\n- Ing. Adriana Virginia Macías Espinales, Mg.\n- Ing. Edison Ernesto Almeida Zambrano, Mg.\n\nPracticas Pre-Profesionales:\n- Ing. Elsa Patricia Vera Burgos, Mg.\n\nPersonal de Servicios:\n- Sra. Zoila Alexandra Barcia Vera\n- Sr. Sócrates Pericles García Cevallos\n- Sr. Ronald Fabián Pico Alonzo\n- Sr. Dimas Justidiano Zambrano Lugo\n\nPara salir envía *salir*\n¿Deseas volver al menú? Envía *menu*`
                        ]

                    }
                    
                }else if( optionsCurrent.length === 1){
                    
                    let existOption = false;

                    if( convINT === 1 ){
                        return messageToSend = [
                            `Esta es la información disponible sobre la comunidad *MANTARAYA*:\n\n🧑🏻‍💼 Representante encargado: Eddy Espinoza\n\nComunícate con esta comunidad por medio de su lider al: +593987654321\nContacté por correo electrónico: mantarrayacommunity@gmail.com\n\nSiguelos en sus redes sociales:\nFacebook: @comunidadMantarraya\nInstagram: https://www.instagram.com/\n\nPara salir envía *salir*\n¿Deseas volver al menú? Envía *menu*`
                        ]
                    }
                    else if( convINT === 2 ){
                        return messageToSend = [
                            `Esta es la información disponible sobre la comunidad *ELECTROFAC*:\n\n🧑🏻‍💼 Representante encargado: Leonel Anchundia\n\nComunícate con esta comunidad por medio de su lider al: +593963682245\nContacté por correo electrónico: team.electrofac@gmail.com\n\nSiguelos en sus redes sociales:\nFacebook: @facci.electrofac\nInstagram: https://www.instagram.com/\n\nPara salir envía *salir*\n¿Deseas volver al menú? Envía *menu*`
                        ]
                    }

                    if(!existOption){
                        return messageToSend = [
                            `⚠️No tengo ninguna *opcion ${convINT}*⚠️. Ingresa la opción correcta.`
                        ];
                    }

                }
    
        }

    });
      
    return {
        listMessage: messageToSend,
        leg : legend,
        opts: optionsCurrent
    };

}


module.exports = LoadResponse;
