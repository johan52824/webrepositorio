const  mongoose  =  require ( "mongoose" ) ;
const { schedule } = require("node-cron");
const  { Schema }  =   mangosta ;

const  DeporteSchema  =   new Schema(
    {
        titulo : { tipo : String } ,
        enlace :   { tipo : String } ,
    } ,
    {
        //marcas de tiempo : {  createdAt : true ,  updatedAt : true  }
    }
) ;
 
module . exports  =  mongoose . modelo ( "Deportes" ,  DeporteSchema ) ;///////*/