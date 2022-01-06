# Seleccionamos la imagen base, en este caso en NODE
FROM node

# Copiamos nuestros archivos a la carpeta www
COPY . /var/www

# Establecemos que nuestra carpeta de trabajo es la carpeta www
WORKDIR /var/www

# Instalamos las depencias
RUN npm install

# Exponemos el puerto
EXPOSE 3000

# Entrada de la apliación, este es el comando con el que inicia la aplicación
ENTRYPOINT ["npm", "start"]