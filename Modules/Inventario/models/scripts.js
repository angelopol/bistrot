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

    // Mostrar el formulario de edición correspondiente
    showEditForm(tab);

    // Mostrar el formulario de agregar correspondiente
    showAddForm(tab);
}

function showEditForm(tab) {
    // Ocultar todos los formularios de edición
    document.querySelectorAll('.edit-form').forEach(form => {
        form.classList.add('d-none');
    });

    // Mostrar el formulario correspondiente a la pestaña seleccionada
    const editForm = document.getElementById(`edit${capitalizeFirstLetter(tab)}`);
    if (editForm) {
        editForm.classList.remove('d-none');
    }
}

function showAddForm(tab) {
    // Ocultar todos los formularios de agregar
    document.querySelectorAll('.add-form').forEach(form => {
        form.classList.add('d-none');
    });

    // Mostrar el formulario correspondiente a la pestaña seleccionada
    const addForm = document.getElementById(`add${capitalizeFirstLetter(tab)}`);
    if (addForm) {
        addForm.classList.remove('d-none');
    }
}

// Event listener para el botón editar
document.getElementById('editarBtn').addEventListener('click', function () {
    const activeTab = document.querySelector('.tab-active').id.replace('btn', '').toLowerCase();
    showEditForm(activeTab);
    document.getElementById('cardContainer').classList.add('show');
    document.getElementById('cardd').classList.add('show');
});

// Event listener para el botón agregar
document.getElementById('AgregarBtn').addEventListener('click', function () {
    const activeTab = document.querySelector('.tab-active').id.replace('btn', '').toLowerCase();
    showAddForm(activeTab);
    document.getElementById('cardContainerAgregar').classList.add('show');
    document.getElementById('cardd').classList.add('show');
});


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

document.addEventListener('DOMContentLoaded', function () {
    // Editar
    const openEditarBtn = document.getElementById('editarBtn');
    const closeCardButton = document.getElementById('closeCardButton');
    const cardContainer = document.getElementById('cardContainer');
    const card = document.getElementById('cardd');
    const cancelButtonEditar = document.getElementById('cancelButtonEditar');

    //Ajustes
    const openAjusteBtn = document.getElementById('showAjustesBtn');
    const closeCardButton2 = document.getElementById('closeAjusteButton');
    const ajusteDiv = document.getElementById('ajusteDiv');
    const cardAjustes = document.getElementById('cardd');

    // ------- Edición ---------
    // Mostrar div de edición
    openEditarBtn.addEventListener('click', function () {
        cardContainer.classList.add('show');
        card.classList.add('show');
    });

    // Ocultar div de edición
    closeCardButton.addEventListener('click', function () {
        cardContainer.classList.remove('show');
        card.classList.remove('show');
    });

    // Cancelar Editar
    cancelButtonEditar.addEventListener('click', function () {
        cardContainer.classList.remove('show');
        card.classList.remove('show');
    });

    //------------Ajuste------------
    // Mostrar div de edición
    openAjusteBtn.addEventListener('click', function () {
        ajusteDiv.classList.add('show');
        cardAjustes.classList.add('show');
    });

    // Ocultar div de edición
    closeCardButton2.addEventListener('click', function () {
        ajusteDiv.classList.remove('show');
        cardAjustes.classList.remove('show');
    });

    //--------Registro-----------

    // Mostrar el registro
    document.getElementById('showRegistroBtn').addEventListener('click', function () {
        document.getElementById('registroDiv').classList.add('show');
    });

    // Cerrar el registro
    document.getElementById('closeRegistroButton').addEventListener('click', function () {
        document.getElementById('registroDiv').classList.remove('show');
    });


    // Siguiente (puedes agregar lógica adicional aquí si es necesario)
    ConfirmarAgregarBtn.addEventListener('click', function () {
        // Aquí puedes agregar la lógica para manejar el botón "Siguiente"
        console.log('Siguiente paso en el proceso de agregar');
    });
});

// tabla registros
function generateTableRegistros() {
    var url = 'http://localhost:3000/api/registros'; // URL de la API para registros

    $('#tablaRegistros').DataTable({
        "language": {
            "search": "Buscar:",
            "lengthMenu": "Mostrar _MENU_ registros por página",
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
            { "data": "id" },
            {
                "data": "fecha_registro",
                "render": function (data, type, row) {
                    if (data) {
                        var fecha = new Date(data);
                        return fecha.toLocaleDateString('es-ES');
                    } else {
                        return 'No especificada';
                    }
                }
            },
            { "data": "modulo" },
            { "data": "usuario" },
            { "data": "producto" },
            { "data": "tipo_ajuste" },
            { "data": "cantidad" },
            { "data": "observaciones" }
        ]
    });
}

// Llama a la función para generar la tabla de registros al cargar la página
$(document).ready(function () {
    generateTableRegistros();
    $('#tablaRegistros').removeClass('d-none');
});

// Función para buscar y mostrar el producto según el ID
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const productId = document.getElementById('order-id-n').value.trim();
    const tableType = document.getElementById('tablaAjuste').value;
    // Resetear los campos
    document.getElementById('productName').textContent = '';
    document.getElementById('currentQuantity').textContent = '';

    // Verificar si el ID está vacío o no es un número
    if (!productId || isNaN(productId)) {
        alert('Por favor ingresa un ID válido');
        return;
    }

    // URL de la API basada en el tipo de tabla y el ID del producto
    let apiUrl = '';
    if (tableType === 'cocina-bar' || tableType === 'general') {
        apiUrl = `http://localhost:3000/api/${tableType}/${productId}`;
    } else {
        alert('Tabla seleccionada no válida');
        return;
    }

    // Hacer la solicitud a la API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Producto no encontrado');
                } else {
                    throw new Error('Error en la solicitud');
                }
            }
            return response.json();
        })
        .then(data => {
            // Mostrar los datos del producto encontrado
            document.getElementById('productName').textContent = data.nombre;
            document.getElementById('currentQuantity').textContent = data.cantidad;
        })
        .catch(error => {
            alert(error.message);
        });
});

// Función para realizar el ajuste de inventario
document.getElementById('finalizarAjuste').addEventListener('click', function () {
    const productId = document.getElementById('order-id-n').value.trim();
    const tableType = document.getElementById('tablaAjuste').value;
    const adjustmentType = document.getElementById('tipoAjuste').value;
    const adjustmentAmount = document.getElementById('cantidadAjuste').value.trim();
    const observations = document.getElementById('observations-f').value.trim();

    // Validar campos requeridos y tipo de datos
    if (!productId || isNaN(productId) || !adjustmentAmount || isNaN(adjustmentAmount)) {
        alert('Por favor completa todos los campos con valores numéricos válidos');
        return;
    }

    let productName = '';
    fetch(`http://localhost:3000/api/${tableType}/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener información del producto');
            }
            return response.json();
        })
        .then(product => {
            productName = product.nombre; // Guardar el nombre del producto obtenido

            // URL de la API para el ajuste
            let apiUrl = '';
            if (tableType === 'cocina-bar' || tableType === 'general') {
                apiUrl = `http://localhost:3000/api/${tableType}/${adjustmentType}/${productId}`;
            } else {
                alert('Tabla seleccionada no válida');
                return;
            }

            // Crear objeto con los datos del ajuste
            const adjustmentData = {
                cantidad: adjustmentAmount,
                observaciones: observations || `Ajuste de cantidad para ${productName}`, // Incluir observaciones con el nombre del producto
                producto: productId,
            };

            // Hacer la solicitud PUT a la API para ajustar el inventario
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adjustmentData)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al ajustar inventario');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            // Limpiar los campos después de finalizar el ajuste y recargar
            document.getElementById('order-id-n').value = '';
            document.getElementById('cantidadAjuste').value = '';
            document.getElementById('observations-f').value = '';
            document.getElementById('productName').textContent = '';
            document.getElementById('currentQuantity').textContent = '';
            location.reload();
        })
        .catch(error => {
            alert(error.message);
        });
});






// Importar la conexión a la base de datos
const connection = require('./conexion');

// Definir la función verificarInventario
function verificarInventario(callback) {
    // Consulta para verificar la tabla cocina_bar
    const queryCocinaBar = `
      SELECT id_cocina_bar AS id, nombre, cantidad
      FROM cocina_bar
      WHERE cantidad <= 10;
    `;

    // Consulta para verificar la tabla general
    const queryGeneral = `
      SELECT id_general AS id, nombre, cantidad
      FROM general
      WHERE cantidad <= 10;
    `;

    connection.query(queryCocinaBar, (err, resultsCocinaBar) => {
        if (err) throw err;

        connection.query(queryGeneral, (err, resultsGeneral) => {
            if (err) throw err;

            // Concatenar resultados de ambas tablas
            const lowStockItems = [...resultsCocinaBar, ...resultsGeneral];

            // Agregar cantidad base para pedir
            const pedidos = lowStockItems.map(item => ({
                id: item.id,
                nombre: item.nombre,
                cantidad_a_pedir: 20
            }));

            callback(pedidos);
        });
    });
}

module.exports = verificarInventario;