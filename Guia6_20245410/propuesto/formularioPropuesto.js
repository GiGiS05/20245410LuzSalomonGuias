//Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
//Componente de bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

const editarPacienteModalElement = document.getElementById("idModalEditar");
const editarPacienteModal = new bootstrap.Modal(editarPacienteModalElement);
const bodyModalEditar = document.getElementById("idBodyModal");


//Arreglo global de pacientes
let arrayPaciente = [];

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

/*
Funcion para validar el ingreso del paciente
*/
const addPaciente = function() {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        //Agregando informacion al arreglo paciente
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        //llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //llamando al componente de Bootstrap
        toast.show();
    }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td class="text-center">${element[0]}</td>
            <td class="text-center">${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Eliminar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Editar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
        <tr>
            <th scope="col" class="text-center" style="width: 5%">#</th>
            <th scope="col" class="text-center" style="width: 15%">Nombre</th>
            <th scope="col" class="text-center" style="width: 15%">Apellido</th>
            <th scope="col" class="text-center" style="width: 10%">Fecha nacimiento</th>
            <th scope="col" class="text-center" style="width: 10%">Sexo</th>
            <th scope="col" class="text-center" style="width: 10%">Pais</th>
            <th scope="col" class="text-center" style="width: 25%">Dirección</th>
            <th scope="col" class="text-center" style="width: 10%">Opciones</th>
        </tr>
        ${imprimirFilas()}
    </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
    
    //Agregar eventos a los botones eliminar y editar
    agregarEliminar();
    agregarEditar();
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        //Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Pais agregado correctamente";
        //llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //llamando al componente de Bootstrap
        toast.show();
    }
};

//Eliminar paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();

    // Volver a cargar la tabla
    if (arrayPaciente.length > 0) {
        imprimirPacientes();
    } else {
        document.getElementById("idTablaPacientes").innerHTML = "Ninguno";
    }
};

// Agregar eventos a los botones de eliminar dinamicamente
const agregarEliminar = () => {
    const botonesEliminar = document.querySelectorAll('[id^="idBtnEliminar"]');

    botonesEliminar.forEach((boton) => {
        boton.onclick = function() {
            // Obtener el contador de la tabla
            const id = this.getAttribute("id");
            const index = parseInt(id.replace("idBtnEliminar", ""))-1;

            if (confirm("¿Está seguro de eliminar este paciente?")) {
                eliminarPaciente(index);
            }
        };
    });
};

//Formulario de edición en modal
const generarFormularioEdicion = (index) => {
    const paciente = arrayPaciente[index];
    
    // Generar opciones del select de país
    let opcionesPais = `<option value="0">Seleccione un Pais</option>`;
    for (let i = 1; i < cmbPais.options.length; i++) {
        const selected = cmbPais.options[i].text === paciente[4] ? "selected" : "";
        opcionesPais += `<option value="${cmbPais.options[i].value}" ${selected}>${cmbPais.options[i].text}</option>`;
    }

    const formulario = `
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="idEditNombre" value="${paciente[0]}">
            <label for="idEditNombre"><i class="bi bi-person-circle"></i> Nombre</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="idEditApellido" value="${paciente[1]}">
            <label for="idEditApellido"><i class="bi bi-person-circle"></i> Apellido</label>
        </div>
        <div class="form-floating mb-3">
            <input type="date" class="form-control" id="idEditFecha" value="${paciente[2]}">
            <label for="idEditFecha"><i class="bi bi-calendar-date"></i> Fecha nacimiento</label>
        </div>
        <div class="mb-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="rdSexoEdit" id="idEditMasculino" ${paciente[3] === "Hombre" ? "checked" : ""}>
                <label class="form-check-label" for="idEditMasculino">Hombre</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="rdSexoEdit" id="idEditFemenino" ${paciente[3] === "Mujer" ? "checked" : ""}>
                <label class="form-check-label" for="idEditFemenino">Mujer</label>
            </div>
        </div>
        <div class="mb-3">
            <select class="form-select" id="idEditPais">
                ${opcionesPais}
            </select>
        </div>
        <div class="form-floating mb-3">
            <textarea class="form-control" id="idEditDireccion" rows="3">${paciente[5]}</textarea>
            <label for="idEditDireccion"><i class="bi bi-geo"></i> Dirección</label>
        </div>
        <button type="button" class="btn btn-success" id="idBtnGuardarEdicion">
            <i class="bi bi-check-circle"></i> Guardar cambios
        </button>
    `;
    
    return formulario;
};

// Funcion para guardar los cambios de edición
const guardarEdicion = () => {
    const nombre = document.getElementById("idEditNombre").value;
    const apellido = document.getElementById("idEditApellido").value;
    const fecha = document.getElementById("idEditFecha").value;
    const sexo = document.getElementById("idEditMasculino").checked ? "Hombre" 
               : document.getElementById("idEditFemenino").checked ? "Mujer" : "";
    const paisSelect = document.getElementById("idEditPais");
    const pais = paisSelect.options[paisSelect.selectedIndex].text;
    const direccion = document.getElementById("idEditDireccion").value;

    if (nombre && apellido && fecha && sexo && paisSelect.value != 0 && direccion) {
        arrayPaciente[indicePacienteEditando] = [nombre, apellido, fecha, sexo, pais, direccion];
        
        mensaje.innerHTML = "Paciente actualizado correctamente";
        toast.show();
        
        editarPacienteModal.hide();
        imprimirPacientes();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Funcion para agregar eventos a los botones de editar dinamicamente
const agregarEditar = () => {
    const botonesEditar = document.querySelectorAll('[id^="idBtnEditar"]');

    botonesEditar.forEach((boton) => {
        boton.onclick = function() {
            const id = this.getAttribute("id");
            const index = parseInt(id.replace("idBtnEditar", "")) - 1;
            
            indicePacienteEditando = index;
            bodyModalEditar.innerHTML = generarFormularioEdicion(index);
            editarPacienteModal.show();
            
            // Agregar evento al botón guardar después de crear el formulario
            document.getElementById("idBtnGuardarEdicion").onclick = guardarEdicion;
        };
    });
};


//Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});



//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();


