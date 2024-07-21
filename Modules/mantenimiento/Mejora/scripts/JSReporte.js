function mostrarVista(boton){ //Funcion que se ejecuta a la hora de mostrar una vista de un reporte
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
    botonEliminar = document.getElementById("Button_formulario_EliminarReporte");

    //Cerrando ventana principal de reportes y abriendo vista del reporte
    if (form.style.display == "block"){
        form.style.display = "none"
        botonAgregar.style.display = "none"
        botonEliminar.style.display = "inline"
        vista.style.display = "block"
    }
}

function redactar(){
    //Obtencion de forms
    redaccion = document.getElementById("redaccionReportes");
    form = document.getElementById("formReportes");

    //Obtencion de botones
    botonAgregar = document.getElementById("Button_formulario_Agregar");
    botonEnviar = document.getElementById("Button_formulario_Enviar");

    if (form.style.display == "block"){
        form.style.display = "none"
        botonAgregar.style.display = "none"
        botonEnviar.style.display = "inline"
        redaccion.style.display = "block"
    }
}

function regresar(){ //Funcion que se ejecuta con el boton de Regresar
    //Obtencion de forms
    vista = document.getElementById("vistaReportes");
    form = document.getElementById("formReportes");
    redaccion = document.getElementById("redaccionReportes");

    //Obtencion de botones
    botonEliminar = document.getElementById("Button_formulario_EliminarReporte");
    botonAgregar = document.getElementById("Button_formulario_Agregar");
    botonEnviar = document.getElementById("Button_formulario_Enviar");

    //Comprobar que elemento esta abierto para ejecutar la accion
    if(form.style.display=="block"){
        window.location.href = 'Pagina_principal.html';
    }else if(vista.style.display=="block"){
        vista.style.display = "none"
        botonEliminar.style.display = "none"
        botonAgregar.style.display = "inline"
        form.style.display = "block"
    }else if(redaccion.style.display=="block"){
        redaccion.style.display = "none"
        botonEnviar.style.display = "none"
        botonAgregar.style.display = "inline"
        form.style.display = "block"
    }
}