document.addEventListener('DOMContentLoaded', (event) => {
    changeTab('insumos'); // Inicializa con la primera pestaña activa
});

function changeTab(tab) {
    // Remueve la clase activa de todos los botones
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('tab-active');
        button.classList.add('tab-inactive');
    });

    // Añade la clase activa al botón seleccionado
    const activeButton = document.getElementById(`btn${capitalizeFirstLetter(tab)}`);
    activeButton.classList.remove('tab-inactive');
    activeButton.classList.add('tab-active');

    // Actualiza el contenido de la tabla
    updateTableContent(tab);
}

function updateTableContent(tab) {
    // Destruye las tablas DataTable si ya existen
    if ($.fn.DataTable.isDataTable('#tablaCocinaBar')) {
        $('#tablaCocinaBar').DataTable().destroy();
    }
    if ($.fn.DataTable.isDataTable('#tablaGeneral')) {
        $('#tablaGeneral').DataTable().destroy();
    }

    // Actualiza el contenido de la tabla
    switch (tab) {
        case 'insumos':
            $('#tablaCocinaBar').removeClass('d-none');
            $('#tablaGeneral').addClass('d-none');
            generateTableCocina();
            break;
        case 'equipos':
            $('#tablaCocinaBar').addClass('d-none');
            $('#tablaGeneral').removeClass('d-none');
            generateTableGeneral('Equipo');
            break;
        case 'muebles':
            $('#tablaCocinaBar').addClass('d-none');
            $('#tablaGeneral').removeClass('d-none');
            generateTableGeneral('Mueble');
            break;
        case 'maquinaria':
            $('#tablaCocinaBar').addClass('d-none');
            $('#tablaGeneral').removeClass('d-none');
            generateTableGeneral('Maquinaria');
            break;
        default:
            break;
    }
}

function generateTableCocina() {
    var url = 'http://localhost:3000/api/cocina-bar'; // URL de la API para cocina-bar

    $('#tablaCocinaBar').DataTable({
        "language": {
            "search": "Búsqueda:",
            "lengthMenu": "Mostrar _MENU_ Registros por página",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "searchPlaceholder": "Buscar...",
            "emptyTable": "No hay datos disponibles en la tabla",
            "thousands": ".",
            "decimal": ","
        },
        "ajax": {
            "url": url,
            "dataSrc": ""
        },
        "columns": [
            { "data": "id_cocina_bar" },
            { "data": "nombre" },
            { "data": "categoria" },
            { "data": "cantidad" },
            { "data": "area" },
            { "data": "unidad" },
            {
                "data": "fecha_caducidad",
                "render": function (data, type, row) {
                    if (data) {
                        var fecha = new Date(data);
                        return fecha.toLocaleDateString('es-ES');
                    } else {
                        return 'No especificada';
                    }
                }
            }
        ],
        "columnDefs": [{
            "targets": [3],
            "render": function (data, type, row) {
                return Number(data).toFixed(2);
            }
        }]
    });
}

function generateTableGeneral(tipo) {
    var url = `http://localhost:3000/api/general`; // URL de la API para general sin filtro

    $('#tablaGeneral').DataTable({
        "language": {
            "search": "Búsqueda:",
            "lengthMenu": "Mostrar _MENU_ Registros por página",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "searchPlaceholder": "Buscar...",
            "emptyTable": "No hay datos disponibles en la tabla",
            "thousands": ".",
            "decimal": ","
        },
        "ajax": {
            "url": url,
            "dataSrc": function (json) {
                // Filtrar los datos por el tipo especificado
                return json.filter(item => item.tipo === tipo);
            }
        },
        "columns": [
            { "data": "id_general" },
            { "data": "nombre" },
            { "data": "categoria" },
            {
                "data": "funciona_estado",
                "render": function (data, type, row) {
                    return data === 1 ? "Funcional" : "No funcional";
                }
            },
            {
                "data": "fecha_mantenimiento",
                "render": function (data, type, row) {
                    if (data) {
                        var fecha = new Date(data);
                        return fecha.toLocaleDateString('es-ES');
                    } else {
                        return 'No especificada';
                    }
                }
            },
            { "data": "unidad" },
            { "data": "cantidad" }
        ],
        "columnDefs": [{
            "targets": [6],
            "render": function (data, type, row) {
                return Number(data).toFixed(2);
            }
        }]
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', function() {
    // Editar
    const openEditarBtn = document.getElementById('editarBtn');
    const closeCardButton = document.getElementById('closeCardButton');
    const cardContainer = document.getElementById('cardContainer');
    const card = document.getElementById('cardd');
    const cancelButtonEditar = document.getElementById('cancelButtonEditar');

    // Commit editar
    const comentarBtn = document.getElementById('comentarCambios');
    const closeCommitButton = document.getElementById('closeCommitButton');
    const commitContainer = document.getElementById('commitMessageContainer');
    const commit = document.getElementById('commit');
    const atras = document.getElementById('commitAtrasButton');

    // Borrar
    const borrarBtn = document.getElementById('borrarBtn');
    const cardContainer2 = document.getElementById('cardContainer2');
    const card2 = document.getElementById('card2');
    const closeCardButtonBorrar = document.getElementById('closeCardButtonBorrar');
    const cancelButtonBorrar = document.getElementById('cancelButtonBorrar');

    // Commit borrar
    const comentarBorrarBtn = document.getElementById('openCardButtonBorrar');
    const commitContainerBorrar = document.getElementById('commitMessageContainerBorrar');
    const commitBorrar = document.getElementById('commitBorrar');
    const closeCommitButtonBorrar = document.getElementById('closeCommitButtonBorrar');
    const atrasCommitBorrar = document.getElementById('atrasCommitBorrar');

    // ------- Agregar ---------
    const agregarBtn = document.getElementById('agregarBtn');
    const cardContainerAgregar = document.getElementById('cardContainerAgregar');
    const cardAgregar = document.getElementById('cardAgregar');
    const closeCardButtonAgregar = document.getElementById('closeCardButtonAgregar');
    const cancelarAgregar = document.getElementById('cancelarAgregar');
    const ConfirmarAgregarBtn = document.getElementById('AgregarBtn');

    // ------- Edición ---------
    // Mostrar div de edición
    openEditarBtn.addEventListener('click', function() {
        cardContainer.classList.add('show');
        card.classList.add('show');
    });

    // Ocultar div de edición
    closeCardButton.addEventListener('click', function() {
        cardContainer.classList.remove('show');
        card.classList.remove('show');
    });

    // Cancelar Editar
    cancelButtonEditar.addEventListener('click', function() {
        cardContainer.classList.remove('show');
        card.classList.remove('show');
    });

    // Mostrar commit editar
    comentarBtn.addEventListener('click', function() {
        commitContainer.classList.add('show');
        commit.classList.add('show');
        cardContainer.classList.remove('show');
        card.classList.remove('show');
    });

    // Ocultar commit editar
    closeCommitButton.addEventListener('click', function() {
        commitContainer.classList.remove('show');
        commit.classList.remove('show');
    });

    atras.addEventListener('click', function() {
        cardContainer.classList.add('show');
        card.classList.add('show');
        commitContainer.classList.remove('show');
        commit.classList.remove('show');
    });

    // --------- Borrar --------
    // Mostrar div para Borrar
    borrarBtn.addEventListener('click', function() {
        cardContainer2.classList.add('show');
        card2.classList.add('show');
    });

    // Ocultar div para Borrar
    closeCardButtonBorrar.addEventListener('click', function() {
        cardContainer2.classList.remove('show');
        card2.classList.remove('show');
    });

    // Cancelar borrar
    cancelButtonBorrar.addEventListener('click', function() {
        cardContainer2.classList.remove('show');
        card2.classList.remove('show');
    });

    // Mostrar commit borrar
    comentarBorrarBtn.addEventListener('click', function() {
        commitContainerBorrar.classList.add('show');
        commitBorrar.classList.add('show');
        cardContainer2.classList.remove('show');
        card2.classList.remove('show');
    });

    // Ocultar commit borrar
    closeCommitButtonBorrar.addEventListener('click', function() {
        commitContainerBorrar.classList.remove('show');
        commitBorrar.classList.remove('show');
    });

    // Atrás commit borrar
    atrasCommitBorrar.addEventListener('click', function() {
        cardContainer2.classList.add('show');
        card2.classList.add('show');
        commitContainerBorrar.classList.remove('show');
        commitBorrar.classList.remove('show');
    });

    //--------Registro-----------

    // Mostrar el registro
    document.getElementById('showRegistroBtn').addEventListener('click', function() {
        document.getElementById('registroDiv').classList.add('show');
    });

    // Cerrar el registro
    document.getElementById('closeRegistroButton').addEventListener('click', function() {
        document.getElementById('registroDiv').classList.remove('show');
    });

    //--------Agregar-----------
     // Mostrar div de agregar
    agregarBtn.addEventListener('click', function() {
        cardContainerAgregar.classList.add('show');
        cardAgregar.classList.add('show');
    });

    // Ocultar div de agregar
    closeCardButtonAgregar.addEventListener('click', function() {
        cardContainerAgregar.classList.remove('show');
        cardAgregar.classList.remove('show');
    });

    // Cancelar agregar
    cancelarAgregar.addEventListener('click', function() {
        cardContainerAgregar.classList.remove('show');
        cardAgregar.classList.remove('show');
    });

    // Siguiente (puedes agregar lógica adicional aquí si es necesario)
    ConfirmarAgregarBtn.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para manejar el botón "Siguiente"
        console.log('Siguiente paso en el proceso de agregar');
    });
});