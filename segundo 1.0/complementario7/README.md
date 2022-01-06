## TRABAJO COMPLEMENTARIO 2 

## Ejemplo de implementación de docker al backend de la apliación del primer parcial

En este ejemplo tenemos el bakend de la apliación del primer parcial.

Tenemos el archivo Dockerfile donde tenemos los comandos necesarios para instalar nuestra aplicación.

## Instalación

En el directorio actual ejecutamos el siguiente comando, para construir la imagen de nuestra API.

 docker build . -t complementario1

Luego podemos ejecutar nuestra imagen.

 docker run --name pruebacomple -d complementario1



 ## Ejemplo de implementación de docker-compose con api en nodejs y base de datos en mongodb

En este ejemplo se utiliza la imagen de la practica #6, pero la instalación es diferente.

## Instalación

Tenemos que inculir la URL de la base de datos de mongoDB local. en nuestro archivo .env

```sh
MONGO_CONNECTION_STRING=mongodb://mongo-db:27017
```

En el directorio actual ejecutamos los siguientes comandos, el primero permitirá construir nuestro docker-compose.

```sh
sudo docker-compose build --no-cache
```

Luego ya podemos ejecutar nuestro docker-compose.

```sh
sudo docker-compose up -d
```