//if  ( proceso . env . NODE_ENV  ! ==  "producción"  )
{
    require ( "dotenv" ) . config ( ) ;
}

módulo . exportaciones = {
    MONGO_URI : proceso . env . MONGO_URI
}