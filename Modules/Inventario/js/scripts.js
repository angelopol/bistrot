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
            { "data": "tipo" },
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

