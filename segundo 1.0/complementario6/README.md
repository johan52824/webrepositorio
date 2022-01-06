## Ejemplo de implementación de docker al backend de la apliación del primer parcial

En este ejemplo tenemos el bakend de la apliación del primer parcial.

Tenemos el archivo Dockerfile donde tenemos los comandos necesarios para instalar nuestra aplicación.

En el archivo .dockerignore ponemos los archivos que no queremos que sean copiados en nuestro contenedor.

## Instalación

En el directorio actual ejecutamos el siguiente comando, para construir la imagen de nuestra API.

```sh
sudo docker build . -t nodejs-api
```

Luego podemos ejecutar nuestra imagen.

```sh
sudo docker run -p 3000:3000 nodejs-api
```
