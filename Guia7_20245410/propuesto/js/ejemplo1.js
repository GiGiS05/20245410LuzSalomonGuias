//Accediendo a la referencia del formulario que tendrá los nuevos
//elementos
const newForm = document.getElementById("idNewForm");

//Accediendo a la referencia de botones
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

//Accediendo al valor del select para determinar el tipo de elemento a crear
const cmbElemento = document.getElementById("idCmbElemento");

//Accediendo a los controles del modal
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

//Creando modal con bootstrap
const modal = new bootstrap.Modal(document.getElementById("idModal"),{});

//Crear boton submit 1.b
const btnSubmit = document.createElement("button");
btnSubmit.setAttribute("id", "idValidarFormularios");
btnSubmit.setAttribute("class", "btn btn-primary");
btnSubmit.innerHTML = "Validar Formulario"

//Agregando funciones
const verificarTipoElemento = function(){
    let elemento = cmbElemento.value;
    //validando que se haya seleccionado un elemento
    if (elemento != ""){
        //Metodo perteneciente al modal de bootstrap
        modal.show();
    }else{
        alert("Debe seleccionar el elemento que se creará");
    }
}



const newSelect = function(){
    //creando elementos
    let addElemento = document.createElement("select");
    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id",`id${nombreElemento.value}`);
    addElemento.setAttribute("class","form-select");

    //creando option para el select
    for (let i=1; i<=10; i++){
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);

        //creando label par el nuevo control
        let labelElemento = document.createElement("label");
        labelElemento.setAttribute("for",`id${nombreElemento.value}`);
        //creando texto para el label
        labelElemento.textContent = tituloElemento.value;

        //creando label de id
        let labelId = document.createElement("span");
        labelId.textContent = `Id de control: ${nombreElemento.value}`;

        //creando plantilla de bootrstrap par visualizar el nuevo elemento
        let divElemento = document.createElement("div");
        //agregando Atributos
        divElemento.setAttribute("class","form-floating");

        //Creando el input que sera hijo del div
        divElemento.appendChild(addElemento);
        //Creando el label que sera hijo del div
        divElemento.appendChild(labelElemento);

        //Creando el SPAN que sera hijo del nuevo formulario
        newForm.appendChild(labelId);
        //Creando el DIV que sera hijo del nuevo formulario
        newForm.appendChild(divElemento);
        //Creando el boton submit que sera hijo del nuevo formulario si no existe
        if (!document.getElementById("idValidarFormularios")){
            newForm.appendChild(btnSubmit);
        }else{
            newForm.removeChild(btnSubmit);
            newForm.appendChild(btnSubmit);
        }
    }
}
// 1.c
const newColor = function(){
    //creando elemento color
    let addElemento = document.createElement("input");
    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", "color");
    addElemento.setAttribute("class", "form-control form-control-color");

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-control-label");
    //creando el texto para el label
    labelElemento.textContent = tituloElemento.value;

    //creando label del id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    //creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    //agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo formulario
    newForm.appendChild(labelId);
    //Creando el div que sera hijo del nuevo formulario
    newForm.appendChild(divElemento);
    //Creando el boton submit que sera hijo del nuevo formulario si no existe
        if (!document.getElementById("idValidarFormularios")){
            newForm.appendChild(btnSubmit);
        }else{
            newForm.removeChild(btnSubmit);
            newForm.appendChild(btnSubmit);
        }
}

const newRadioCheckbox = function(newElemento){
    //creando elementos
    let addElemento = document.createElement("input");
    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    //creando texto para el label
    labelElemento.textContent = tituloElemento.value;

    //creando label del id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    //Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    //agregando atributos
    divElemento.setAttribute("class", "form-check");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo formulario
    newForm.appendChild(labelId);
    
    //Creando el div que sera hijo del nuevo formulario
    newForm.appendChild(divElemento);
    //Creando el boton submit que sera hijo del nuevo formulario si no existe
        if (!document.getElementById("idValidarFormularios")){
            newForm.appendChild(btnSubmit);
        }else{
            newForm.removeChild(btnSubmit);
            newForm.appendChild(btnSubmit);
        }
}

const newInput = function(newElemento){
    //Creando elementos de tipo = text, number, date, password y email (1.c).
    let addElemento = 
    newElemento == "textarea" 
    ? document.createElement("textarea") 
    : document.createElement("input");

    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id",`id${nombreElemento.value}`);
    addElemento.setAttribute("type",newElemento);
    addElemento.setAttribute("class","form-control");
    addElemento.setAttribute("placeholder",tituloElemento.value);

    //creando label para el nuevo control
    let labelElemento = document.createElement("label")
    labelElemento.setAttribute("for",`id${nombreElemento.value}`);

    //creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class",`bi bi-tag`);

    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //creando el elemento i como hijo del label, afterbegin 
    // le indicamos que se creara antes de su primer hijo
    labelElemento.insertAdjacentElement("afterbegin",iconLabel);

    //creando label id
    let labelId = document.createElement("span")
    labelId.textContent =`ID de control: ${nombreElemento.value}`;

    //Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    //agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    //creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el span que sera hijo del nuevo formulario
    newForm.appendChild(labelId);

    //creando el div que sera hijo del nuevo formulario
    newForm.appendChild(divElemento);
    //Creando el boton submit que sera hijo del nuevo formulario si no existe
        if (!document.getElementById("idValidarFormularios")){
            newForm.appendChild(btnSubmit);
        }else{
            newForm.removeChild(btnSubmit);
            newForm.appendChild(btnSubmit);
        }
}






//Agregando evento clic a los botones
buttonCrear.onclick = ()=>{
    verificarTipoElemento();
}

buttonAddElemento.onclick = ()=>{
    
    //Ejercicio propuesto 1.a validar id unico
    let id = `id${nombreElemento.value}`;
    const validarId = document.getElementById(id) ?  true : false;

    if (nombreElemento.value !="" && tituloElemento.value !="" && !validarId){
        let elemento = cmbElemento.value;

        if (elemento == "select"){
            newSelect();
        }else if (elemento == "radio" || elemento == "checkbox"){
            newRadioCheckbox(elemento);
        }else if (elemento == "color"){
            newColor();
        }else {
            newInput(elemento);
        }
    }else{
        if (validarId){
            alert("Nombre de elemento duplicado o en uso por el creador de formulario. Use un nombre distinto")
        } else {
            alert("Faltan campos por completar");
        }
        
    }
}

//Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () =>{
    //Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    //inicializando puntero en el campo del titulo para el control
    tituloElemento.focus();
})
