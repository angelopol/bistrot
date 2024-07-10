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

    if (form.style.display == "block"){
        form.style.display = "none"
        botonAgregar.style.display = "none"
        vista.style.display = "block"
    }
}