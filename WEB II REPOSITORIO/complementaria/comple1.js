
//1. Crear una función que reciba N como parámetro y genere la tabla de multiplicar por consola utilizando recursividad.//
 
function tabla(N) {
    let multiplicar = 0;

    for (let i = 1; i <= 12; i++) {
        multiplicar = N * i;
        console.log(N + " * " + i + " = " + multiplicar);
    }

}
tabla(2);