//Estos son para hacer el cambio de div y aqui es el parte para los botones
const boton_cambiar = document.getElementById('Button_formulario_Agregar');
const boton_home = document.getElementById('Button_formulario_Volver');
const navegar_home_mantenimiento = document.getElementById('Button_formulario_Inicio');

const div1 = document.getElementById('tipo_formulario');
const div2 = document.getElementById('Agregar_mas_trabajador');


boton_cambiar.addEventListener('click', function () {
    if (div1.style.display === 'block') {
        div1.style.display = 'none';
        div2.style.display = 'block';

        boton_cambiar.style.display = 'none';
        boton_home.style.display = 'inline';
        navegar_home_mantenimiento.style.display = 'none';
    }
});


boton_home.addEventListener('click', function () {
    if (div2.style.display === 'block') {
        div1.style.display = 'block';
        div2.style.display = 'none';
        boton_home.style.display = 'none';
        boton_cambiar.style.display = 'inline';
        navegar_home_mantenimiento.style.display = 'inline';
    }
});

//Para regresar la pagina Mantenimiento
navegar_home_mantenimiento.addEventListener('click', function () {
    window.location.href = 'Pagina_principal.html';
});

//Aqui, es la cosa de modificar la fila que desea para modificar el estado de un miembro
function obtener_el_datos_trabajadores(boton) {
    // Obtener la fila del botón
    var fila = boton.parentNode.parentNode;

    // Obtener los datos de la fila
    var nombre = fila.cells[0].textContent;
    var servicio = fila.cells[1].textContent;
    var tipo_mantenimiento = fila.cells[2].textContent;
    var estados_trabajador = fila.cells[3].textContent;

    document.getElementById("nombre_personal").value = nombre;
    document.getElementById('trabajo_servicio_personal').value = servicio;
    document.getElementById('tipo_mantenimiento').value = tipo_mantenimiento;
    document.getElementById('estatus_trabajador').value = estados_trabajador;

    if (div1.style.display === 'block') {
        div1.style.display = 'none';
        div2.style.display = 'block';

        boton_cambiar.style.display = 'none';
        boton_home.style.display = 'inline';
        navegar_home_mantenimiento.style.display = 'none';
    }
}