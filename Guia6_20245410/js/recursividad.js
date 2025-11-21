//Otra forma de acceder a un elemento HTML es utilizando 
// el getElementById del DOM. Notese que para este caso no se
// antepone el caracter #

const campo = document.getElementById("idTxtNumero");

//definamos una funcion anonima que permita validar en 
// tiempo real el ingreso de un número
const validarNumero = function(e){
    let validar = /^[0-9]{1}$/;
    let tecla = e.key;
    /*. test válida que la expresión regular coincida con
    el valor ingresado. Podrá observar que al intentar 
    teclear una letra u otro caracter diferente a un 
    número, este no se escribe */

    if (!validar.test(tecla)) e.preventDefault();
}

//Definiendo el evento keypress para el campo
campo.addEventListener("keypress", validarNumero);

//Trabajando con el boton calcular
const boton = document.getElementById("idBtnCalcular");

//Definiendo una funcion anonima par calcular el factorial 
// de un numero

function calcularFactorial(numero){
    return numero < 2 ? 1 : numero * calcularFactorial(numero -1);
}

//Definamos una funcion tipo flecha para imprimir el 
// resultado del factorial
const imprimir = (numero, resultado) => {
    const contenedor = document.getElementById("idDivResultado");
    contenedor.innerHTML = `El factorial de ${numero} es ${resultado}`;
}

//Definamos una funcion tradicional

function calcular(){
    let numero = document.getElementById("idTxtNumero").value;
    if (numero != ""){
        //Llamamos a la funcion anonima para que calcule 
        // el factorial
        let resultado = calcularFactorial(numero);
        //Enviando el resultado a una funcion de tipo flecha
        imprimir(numero, resultado);
    }else{
        alert("Debe ingresar un numero válido")
    }
}

//Definiendo el evento click para el boton
boton.addEventListener("click", calcular);
