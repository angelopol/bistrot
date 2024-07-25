const PathUrl = '/inventario/';

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
    var url = PathUrl + 'api/cocina-bar'; // URL de la API para cocina-bar

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
    var url = PathUrl + `api/general`; // URL de la API para general sin filtro

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

    // Ajustes
    const openAjusteBtn = document.getElementById('showAjustesBtn');
    const closeCardButton2 = document.getElementById('closeAjusteButton');
    const ajusteDiv = document.getElementById('ajusteDiv');
    const cardAjustes = document.getElementById('cardd');

    // Registro
    const showRegistroBtn = document.getElementById('showRegistroBtn');
    const closeRegistroButton = document.getElementById('closeRegistroButton');
    const registroDiv = document.getElementById('registroDiv');

    function closeAll() {
        cardContainer.classList.remove('show');
        card.classList.remove('show');
        ajusteDiv.classList.remove('show');
        cardAjustes.classList.remove('show');
        registroDiv.classList.remove('show');
    }

    // ------- Edición ---------
    // Mostrar div de edición
    openEditarBtn.addEventListener('click', function () {
        closeAll();
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
    // Mostrar div de ajuste
    openAjusteBtn.addEventListener('click', function () {
        closeAll();
        ajusteDiv.classList.add('show');
        cardAjustes.classList.add('show');
    });

    // Ocultar div de ajuste
    closeCardButton2.addEventListener('click', function () {
        ajusteDiv.classList.remove('show');
        cardAjustes.classList.remove('show');
    });

    //--------Registro-----------

    // Mostrar el registro
    showRegistroBtn.addEventListener('click', function () {
        closeAll();
        registroDiv.classList.add('show');
    });

    // Cerrar el registro
    closeRegistroButton.addEventListener('click', function () {
        registroDiv.classList.remove('show');
    });
});


// tabla registros
function generateTableRegistros() {
    var url = PathUrl + 'api/registros'; // URL de la API para registros

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
        apiUrl = PathUrl + `api/${tableType}/${productId}`;
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
    fetch(PathUrl + `api/${tableType}/${productId}`)
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
                apiUrl = PathUrl + `api/${tableType}/${adjustmentType}/${productId}`;
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

document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const orderId = document.getElementById('order-id').value;

    try {
        const response = await fetch(`/compras-index/historial/${orderId}`);

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();

        if (data.Recibido) {
            // Si la orden ya fue recibida
            alert('Esta orden de compra ya ha sido recibida.');
        } else {
            // Si la orden no ha sido recibida, muestra los datos
            console.log(data);

            document.querySelector('.order-row').innerHTML = `
                <span class="order-item">${new Date(data.FECHA).toLocaleDateString()}</span>
                <span class="order-item">${data.Producto}</span>
                <span class="order-item">${data.Nombre_Proveedor}</span>
                <span class="order-item">${data.Cantidad}</span>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const finalizeButton = document.getElementById('comentarCambios');

    finalizeButton.addEventListener('click', async () => {
        try {
            const orderId = document.getElementById('order-id').value;
            const receivedQuantity = document.getElementById('received-quantity').value;
            const observations = document.getElementById('observations-txt') ? document.getElementById('observations-txt').value : '';
            const productName = document.querySelector('.order-item:nth-child(2)') ? document.querySelector('.order-item:nth-child(2)').textContent : ''; // Manejo de campo opcional

            if (!productName || !receivedQuantity) {
                alert('Por favor, ingrese el nombre del producto y la cantidad recibida.');
                return;
            }

            let response = await fetch(`/inventario/api/modulo-compras/cocina-bar/agregar/${productName}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad: receivedQuantity, observaciones: observations })
            });

            console.log('Response from cocina_bar:', response.status, await response.text());

            if (response.status === 404) {
                response = await fetch(`/inventario/api/modulo-compras/general/agregar/${productName}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cantidad: receivedQuantity, observaciones: observations })
                });

                console.log('Response from general:', response.status, await response.text());

                if (response.status === 404) {
                    // si no encuentra en ninguna tabla crear nuevo producto
                    response = await fetch('/inventario/api/modulo-compras/cocina-bar/nuevo', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            nombre: productName,
                            categoria: 'cocina',
                            cantidad: receivedQuantity,
                            area: 'almacen',
                            unidad: 'unidad',
                            fecha_caducidad: new Date(),
                            observaciones: observations
                        })
                    });

                    console.log('Response from nuevo:', response.status, await response.text());
                }

                if (response.ok) {
                    alert('Producto creado y cantidad agregada correctamente.');
                    await fetch(`/compras-index/historial-actualizar/${orderId}`, {
                        method: 'PATCH'
                    });
                    location.reload();
                } else {
                    alert('Error al agregar el producto.');
                }
            } else if (response.ok) {
                alert('Cantidad agregada correctamente.');
                await fetch(`/compras-index/historial-actualizar/${orderId}`, {
                    method: 'PATCH'
                });
                location.reload();
            } else {
                alert('Error al agregar la cantidad.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Hubo un problema con la recepción de la orden: ${error.message}`);
        }
    });
});

const solicitudEnviada = {}; // Objeto para rastrear solicitudes enviadas por producto

async function verificarInventario() {
    try {
        //Verificar cantidades en la tabla cocina_bar
        let response = await fetch(`/inventario/api/cocina-bar`);
        let cocinaBarData = await response.json();

        //Verificar cantidades en la tabla general
        response = await fetch(`/inventario/api/general`);
        let generalData = await response.json();

        //Unir los datos de ambas tablas
        const productos = [...cocinaBarData];

        const now = new Date();

        for (const producto of productos) {
            const productoId = producto.id || producto.id_cocina_bar || producto.id_general;

            //Inicializa el estado de las alertas si no está presente
            if (!solicitudEnviada[productoId]) {
                solicitudEnviada[productoId] = {
                    caducidad: false,
                    stockBajo: false
                };
            }

            if (producto.fecha_caducidad && new Date(producto.fecha_caducidad) < now) {
                if (!solicitudEnviada[productoId].caducidad) {
                    await fetch(`/inventario/api/cocina-bar/fecha/${productoId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            observaciones: 'Producto vencido y desechado'
                        })
                    });

                    const solicitud = {
                        depar: 'Inventario',
                        id_emp: '1',
                        cant: '50',
                        nombre_producto: producto.nombre,
                        fecha: new Date(),
                        detalle: 'Solicitud automatica por producto vencido'
                    };

                    await fetch('/compras-index/soli', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(solicitud)
                    });

                    //Marca la solicitud de caducidad como enviada
                    solicitudEnviada[productoId].caducidad = true;

                    console.log(`Solicitud enviada para producto vencido: ${producto.nombre}`);
                }
            } else if (producto.cantidad < 10) {
                if (!solicitudEnviada[productoId].stockBajo) {
                    const solicitud = {
                        depar: 'Inventario',
                        id_emp: '1',
                        cant: '50',
                        nombre_producto: producto.nombre,
                        fecha: new Date(),
                        detalle: 'Solicitud automatica por cantidad baja'
                    };

                    await fetch('/compras-index/soli', { //Verificar sino con 'http://localhost:3000/compras-index/soli'
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(solicitud)
                    });

                    //Marca la solicitud de stock bajo como enviada
                    solicitudEnviada[productoId].stockBajo = true;

                    console.log(`Solicitud enviada para ${producto.nombre}`);
                }
            } else {
                //Resetea las alertas si las condiciones ya no se cumplen
                solicitudEnviada[productoId].caducidad = false;
                solicitudEnviada[productoId].stockBajo = false;
            }
        }
    } catch (error) {
        console.error('Error al verificar el inventario:', error);
    }
}

//Ejecutar la verificación cada 1 segundo (1000 ms)
setInterval(verificarInventario, 1000);

//Ejecutar la función de verificación inmediatamente al cargar el script
verificarInventario();