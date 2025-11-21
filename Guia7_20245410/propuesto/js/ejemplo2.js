// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
const btnValidar = document.forms["frmRegistro"].elements["btnValidar"];



// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT, aka Apellido y nombre
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE = PASSWORD, aka password y passwordRepetir
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO, 4 en total
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX, 4 en total
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = date
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;

        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.innerHTML = resultado;
    //Funcion que permite mostrar el modal de Bootstrap
    //Esta funcion es definida por Bootstrap
    modal.show();
};

//Funcion para validar el formulario
const validarFormulario = function(){
        //registro validación
    let CBvalidado = 0;
    let RDvalidado =0;
    let errores = 2;


    //Mensaje a enviar
    let mensaje = `
        Resultado de validación:<br>
    `;

    //Obtenemos campos distintos de checkbox y de radio btn
    const nombre = document.getElementById("idNombre").value;
    const apellido = document.getElementById("idApellidos").value;
    const fecha = document.getElementById("idFechaNac").value;
    const email = document.getElementById("idCorreo").value;
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;
    const archivos = document.getElementById("idArchivo").files;
    const pais = document.getElementById("idCmPais").value;
    
    //Obtenemos fecha actual
    const fechaHoy = new Date();
    //Patron de correo
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //Revisamos campos vacios
    if (nombre.trim()===""){
        errores++;
        mensaje += "Campo para nombre vacío<br>";
    }
    if (apellido.trim()===""){
        errores++;
        mensaje += "Campo para apellido vacío<br>";
    }
    if (fecha.trim()===""){
        errores++;
        mensaje += "Campo para fecha de nacimiento vacío<br>";
    }else{
        const newFecha = new Date(fecha);
        if (newFecha>fechaHoy){ //verificamos que la 
        // fecha no sea superior a la actual
        errores++;
        mensaje += "Fecha de nacimiento seleccionada inválida<br>";
    } 
    }
    if (email.trim()===""){
        errores++;
        mensaje += "Campo para email vacío<br>";
    } else if (!patronCorreo.test(email)){
        errores++;
        mensaje += "Correo inválido<br>";
    }
    if (password.trim()===""){
        errores++;
        mensaje += "Campo de contraseña vacío<br>";
    }
     if (passwordRepetir.trim()===""){
        errores++;
        mensaje += "Campo para confirmar contraseña vacío<br>";
    }
    if (passwordRepetir.trim()!== password){
        errores++;
        mensaje += "Contraseñas no coinciden<br>";
    }
    if (archivos.length === 0){
        errores++;
        mensaje += "Archivos sin seleccionar<br>";
    }
    if (pais == "Seleccione una opcion"){
        errores++;
        mensaje += "Debe seleccionar su país<br>";
    }

    // Recorriendo elementos del formulario para verificar si 
    // al menos 1 de radio btn y checkbox estan marcados
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Revisa el INPUT TYPE = RADIO, 4 en total
        if (tipoElemento == "radio" && tipoNode == "INPUT") {
            //revisa si hay al menos 1 radio button marcado
            if (RDvalidado == 0){
                if(elemento.checked){
                    RDvalidado++;
                    errores--;
                }
            }
        }
        // Revisa el INPUT TYPE = CHECKBOX, 4 en total
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            //revisa si hay al menos 1 checkbox marcado
            if (CBvalidado == 0){
                if(elemento.checked){
                    CBvalidado++;
                    errores--;
                }
            }
        }
    }

    //Agregamos mensajes de validacion para checkbox y radio btn

    if (CBvalidado ==0){
        mensaje += "Debe seleccionar al menos un area de interes<br>";
    
    }
    if (RDvalidado ==0){
        mensaje += "Debe seleccionar su carrera<br>";
    }

    //Agregamos total de errores
    mensaje += `Total de errores: ${errores}`

    if(errores ==0){
        mensaje+="<br>Formulario valido"
    }
    bodyModal.innerHTML = mensaje;
    modal.show();
}

// agregando eventos al boton
button.onclick = () => {
    recorrerFormulario();
};

btnValidar.onclick = () => {
    validarFormulario();
};


