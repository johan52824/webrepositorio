const  axios     =  require ( 'axios' ) .  default;
const  cheerio   =  require ( 'cheerio' ) ;
const  mangoose  =  require ( 'mangosta' ) ;
const  cron      =  require ( 'nodo-cron' ) ;

const  {  MONGO_URI  }  =   require ( './config' ) ;
const  { Deportes }  =  require ( './modeloss' ) ;


    cron . schedulw ( "0 0 * * *" ,  async  ( ) => {
    try
    {
        const  resconexion  =   await  mangoose . connect ( MONGO_URI )
        const  html =   await  axios . get ( "https://gol.caracoltv.com/" ) ;
        const  $  =  cheerio . load ( html.data )
        const  titulos  =   $ ( ".news__title" ) ;
        let  arregloDeportes = [ ] ;
        titulos . each ( async  ( índex ,  element ) => {
            const  Deportes  =  {
                titulo : $ ( element ) . text ( ) . toString ( )  ,
                enlace : $ ( element ) .  children ( ) . attr ( "href" ) 
            }
            // aguarda Deportes.create (Deprote);
            arregloDeportes =  [ ... arregloDeportes ,  Deportes ] ;
        } )
        //console.log(arregloDeportes)
            Deportes . create ( arregloDeportes ) ;
    }catch ( err ) {
        console . log ( err )
    }
} )
 ;