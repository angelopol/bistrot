function mostrarVista(boton){
    // Obtener la fila del botón
    var fila = boton.parentNode.parentNode;

    // Obtener asunto
    var asunto = fila.cells[3].textContent;

    //Obtener input de la vista
    let asuntoVista = document.getElementById("asuntoVista");

    //Cambiar valor del input de la vista por el asunto
    asuntoVista.value = asunto;

    //Obtener elementos a cambiar
    vista = document.getElementById("vistaReportes");
    form = document.getElementById("formReportes");
    botonAgregar = document.getElementById("Button_formulario_Agregar");

    //Cerrando ventana principal de reportes y abriendo vista del reporte
    if (form.style.display == "block"){
        form.style.display = "none"
        botonAgregar.style.display = "none"
        vista.style.display = "block"
    }
}

function regresar(){
    //Obtecion de elementos
    vista = document.getElementById("vistaReportes");
    form = document.getElementById("formReportes");

    //Comprobar que elemento esta abierto para ejecutar la accion
    if(form.style.display=="block"){
        window.location.href = 'Pagina_principal.html';
    }else if(vista.style.display=="block"){
        vista.style.display = "none"
        botonAgregar.style.display = "inline"
        form.style.display = "block"
    }
}