function validarFormulario() {
    let campoNombre = document.getElementById("nombre").value;
    let campoEmail = document.getElementById("email").value;
    let campoTelefono = document.getElementById("telefono").value;
    let campoConsulta = document.getElementById("consulta").value;

    if (campoNombre === "") {
        Swal.fire({
            title: "Campo obligatorio",
            text: "Debes completar tu nombre y apellido!!!",
            icon: "error"
        });
        return false;
    }
    if (campoEmail === "") {
        Swal.fire({
            title: "Campo obligatorio",
            text: "Debes completar tu email!!!",
            icon: "error"
        });
        return false;
    }
    if (campoTelefono === "") {
        Swal.fire({
            title: "Campo obligatorio",
            text: "Debes completar tu telefono!!!",
            icon: "error"
        });
        return false;
    }
    if (campoConsulta === "") {
        Swal.fire({
            title: "Campo obligatorio",
            text: "Debes completar tu consulta!!!",
            icon: "error"
        });
        return false;
    }

    guardarDatos();
    return true;
}

function guardarDatos() {
    let campoNombre = document.getElementById("nombre").value;
    let campoEmail = document.getElementById("email").value;
    let campoTelefono = document.getElementById("telefono").value;
    let campoConsulta = document.getElementById("consulta").value;
    
    localStorage.setItem("datosUsuario", JSON.stringify({
        nombre: campoNombre,
        email: campoEmail,
        telefono: campoTelefono,
        consulta: campoConsulta
    }));
}

document.getElementById("enviar").addEventListener("click", function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); 
    }
});
