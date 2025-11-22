//Obtenemos todos los campos del formulario
const carnet = document.getElementById("idCarnetTxt");
const nombre = document.getElementById("idNombreTxt");
const dui = document.getElementById("idDuiTxt");
const nit = document.getElementById("idNitTxt");
const fechaNac = document.getElementById("idFechaNacTxt");
const correo = document.getElementById("idCorreoTxt");


//botones
const btnGuardar = document.getElementById("btnGuardar");
const btnLimpiar = document.getElementById("btnLimpiar")

//Expresiones regulares
const carnetRegex = /^[A-Z]{2}[0-9]{3}$/;
const nombreRegex = /^[A-Za-zÁÉÍÓÚÑñáéíóúñ]+\s[A-Za-zÁÉÍÓÚÑñáéíóúñ]+$/;
const duiRegex = /^[0-9]{8}-[0-9]{1}$/;
const nitRegex =/^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;
const fechaHoy = new Date();
const correoRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

//Fecha en formato dd/mm/aaaa
flatpickr("#idFechaNacTxt", {
    dateFormat: "d/m/Y"
});




//Validamos cada una

btnGuardar.onclick = (event)=>{
    //contador de errores
    let errores =0;

    //obtenemos datos del formulario
    let carnetVal = carnet.value.trim();
    let nombreVal = nombre.value.trim();
    let duiVal= dui.value.trim();
    let nitVal = nit.value.trim();
    let fechaNacVal = Date(fechaNac.value.trim());
    let correoVal = correo.value.trim();

    //validamos
   if (!carnetRegex.test(carnetVal)) {
        carnet.classList.add('is-invalid');
        carnet.classList.remove('is-valid');
        errores++;
    }else{
        carnet.classList.add('is-valid');
        carnet.classList.remove('is-invalid');
    }

    if(!nombreRegex.test(nombreVal)){
        nombre.classList.add('is-invalid');
        nombre.classList.remove('is-valid');
        errores++;
    }else{
        nombre.classList.add('is-valid');
        nombre.classList.remove('is-invalid');
    }

    if (!duiRegex.test(duiVal)) {
        dui.classList.add('is-invalid');
        dui.classList.remove('is-valid');
        errores++;
    }else{
        dui.classList.add('is-valid');
        dui.classList.remove('is-invalid');
    }

    if(!nitRegex.test(nitVal)){
        nit.classList.add('is-invalid');
        nit.classList.remove('is-valid');
        errores++;
    }else{
        nit.classList.add('is-valid');
        nit.classList.remove('is-invalid');
    }

    if(fechaNacVal>fechaHoy ||  fechaNac.value===""){
        fechaNac.classList.add('is-invalid');
        fechaNac.classList.remove('is-valid');
        errores++;
    }else{
        fechaNac.classList.add('is-valid');
        fechaNac.classList.remove('is-invalid');
    }

    if(!correoRegex.test(correoVal)){
        correo.classList.add('is-invalid');
        correo.classList.remove('is-valid');
        errores++;
    }else{
        correo.classList.add('is-valid');
        correo.classList.remove('is-invalid');
    }

    if(errores>1){
        alert("Uno o mas campos invalidos")
        event.preventDefault();
        
    }else{
        alert("Formulario guardado")
    }

}

//Limpiar
btnLimpiar.onclick = (event)=>{
    document.querySelector("form").reset();
    event.preventDefault();
}
