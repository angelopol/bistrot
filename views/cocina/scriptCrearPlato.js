// Script para el funcionamiento del formulario


window.onload = function () {
    const maxIngredients = 4;
    let proteinCount = 1;
    let verdurasCount = 1;
    let otroTipoCount = 1;
    let instrumentosCount = 1;

    document.getElementById("addproteina").addEventListener("click", () => {
        if (proteinCount < maxIngredients) {
            proteinCount++;
            document.getElementById("Proteinas").insertAdjacentHTML('beforeend', `
                <div class="ingredient-group">
                    <select class="form-input dropdown text" name="Proteina">
                        <option value="" disabled selected>Proteina</option>
                                                <option value="7">Pollo</option>
                                                <option value="1">Queso</option>
                                                <option value="24">Huevo</option>
                                                <option value="15">Bacalao</option>
                    </select>
                    <input type="number" class="form-input" name="PesoProteina" placeholder="Cantidad"  style = "width: 50px"  />
                    <button type="button" class="remove-button">-</button>
                </div>
            `);
        }
    });

    document.getElementById("addverduras").addEventListener("click", () => {
        if (verdurasCount < maxIngredients) {
            verdurasCount++;
            document.getElementById("Verduras").insertAdjacentHTML('beforeend', `
                <div class="ingredient-group">
                    <select class="form-input dropdown text" name="Verduras">
                        <option value="" disabled selected>Verduras</option>
                                                <option value="2">Tomate</option>
                                                <option value="3">Zanahoria</option>
                                                <option value="4">Cebolla</option>
                                                <option value="5">Papa</option>
                                                <option value="6">Apio</option>
                                                <option value="8">Ajo</option>
                                                <option value="9">Champiñones</option>
                                                <option value="13">Berenjena</option>
                                                <option value="20">Fresa</option>
                                                <option value="21">Patilla</option>
                                                <option value="22">Manzana</option>
                                                <option value="23">Banana</option>
                                                <option value="26">Limon</option>
                                                <option value="38">Lechuga</option>
                                                <option value="39">Pepino</option>
                                                <option value="40">Aji</option>
                                                <option value="41">Pimenton</option>
                                                <option value="42">Cebollin</option>
                    </select>
                    <input type="number" class="form-input" name="PesoVerduras" placeholder="Cantidad" style = "width: 50px" />
                    <button type="button" class="remove-button">-</button>
                </div>
            `);
        }
    });

    document.getElementById("addotrotipo").addEventListener("click", () => {
        if (otroTipoCount < maxIngredients) {
            otroTipoCount++;
            document.getElementById("OtroTipo").insertAdjacentHTML('beforeend', `
                <div class="ingredient-group">
                    <select class="form-input dropdown text" name="OtroTipo">
                        <option value="" disabled selected>Otros</option>
                                                <option value="10">Espelta</option>
                                                <option value="11">Vinagre</option>
                                                <option value="12">Pasta</option>
                                                <option value="14">Aceite</option>
                                                <option value="16">Harina</option>
                                                <option value="17">Leche</option>
                                                <option value="18">Azucar</option>
                                                <option value="19">Chocolate</option>
                    </select>
                    <input type="number" class="form-input" name="PesoOtros" placeholder="Cantidad" style = "width: 50px" />
                    <button type="button" class="remove-button">-</button>
                </div>
            `);
        }
    });

    document.getElementById("addinstrumento").addEventListener("click", () => {
        if (instrumentosCount < maxIngredients) {
            instrumentosCount++;
            document.getElementById("Instrumentos").insertAdjacentHTML('beforeend', `
                <div class="instrument-group">
                    <select class="form-input dropdown text" name="Instrumentos">
                        <option value="" disabled selected>Instrumentos</option>
                                                    <option value="1">cocinaA</option>
                                                    <option value="2">cocinaB</option>
                                                    <option value="3">cocinaC</option>
                                                    <option value="4">cocinaD</option>
                                                    <option value="5">hornoA</option>
                                                    <option value="6">hornoB</option>
                                                    <option value="7">hornoC</option>
                                                    <option value="8">hornoD</option>
                                                    <option value="9">SartenA</option>
                                                    <option value="10">SartenB</option>
                                                    <option value="11">SartenC</option>
                                                    <option value="12">ColadorA</option>
                                                    <option value="13">ColadorB</option>
                                                    <option value="14">OllaA</option>
                                                    <option value="15">OllaB</option>
                                                    <option value="16">OllaC</option>
                                                    <option value="17">NeveraA</option>
                                                    <option value="18">NeveraB</option>
                                                    <option value="19">CocteleraA</option>
                                                    <option value="20">CocteleraB</option>
                                                    <option value="21">CocteleraC</option>
                                                    <option value="22">CocteleraD</option>
                                                    <option value="23">BatidoraA</option>
                                                    <option value="24">BatidoraB</option>
                    </select>
                    <button type="button" class="remove-button">-</button>
                </div>
            `);
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-button")) {
            const ingredientGroup = event.target.closest(".ingredient-group");
            if (ingredientGroup) {
                ingredientGroup.remove();
                proteinCount--;
                verdurasCount--;
                otroTipoCount--;
            } else {
                const instrumentGroup = event.target.closest(".instrument-group");
                if (instrumentGroup) {
                    instrumentGroup.remove();
                    instrumentosCount--;
                }
            }
        }
    });
    
    
    // Script backend
    let botonRegistrar = document.querySelector("#submit-button")
    console.log(botonRegistrar)
    
    botonRegistrar.addEventListener("click",async ()=> {
        // validaciones 
        let comprobacionProteina = document.querySelector("#Proteina")
        let comprobacionVerdura = document.querySelector("#Verdura")
        let comprobacionOtro = document.querySelector("#OtroTipoX")
        let comprobacionTipo = document.querySelector("#TipoX")
        let comprobacionInstrumento = document.querySelector("#Instrumento")
        let comprobacionNombre = document.querySelector("#preparacion")
        if(comprobacionProteina.value == "" || comprobacionVerdura.value == "" || comprobacionOtro.value == "" || comprobacionTipo.value == "" || comprobacionInstrumento.value == "" || comprobacionNombre.value == ""){
            return alert("No deje campos sin seleccionar")
        }

        //"form-input dropdown text"
        let selectIngredientes = document.querySelectorAll(".form-input.dropdown.text")
        let nombreIngredientes = []
        // Tipo o Instrumentos
        selectIngredientes.forEach(selectIngrediente => {
            if(selectIngrediente.name !== "Tipo" && selectIngrediente.name !== "Instrumentos") {
                nombreIngredientes.push(selectIngrediente.value)
                console.log(typeof selectIngrediente.value)
                console.log(selectIngrediente.value)
            }
        })
    
       // form-input
       
       let selectCantidades = document.querySelectorAll(".form-input")
       let cantidades = []
       selectCantidades.forEach(selectCantidad => {
            if(selectCantidad.type == "number"){
            cantidades.push(selectCantidad.value)
            console.log(selectCantidad.value)
            console.log(typeof selectCantidad.value)
            }
        })

        console.log(nombreIngredientes)
        console.log(cantidades)

        let ingredientes = crearFormatoJSON(nombreIngredientes , cantidades) // {"12":21,"25":32,"34":47}

        // sacamos el tipo de comida
        let selectTipos = document.querySelectorAll(".form-input")
        let tipoComida = null
        selectTipos.forEach(selectTipo => {
            if(selectTipo.name == "Tipo"){
                tipoComida = selectTipo.value
            }
        })
        
        console.log(tipoComida)

        // sacamos los intumentos 
        let selectInstrumentos = document.querySelectorAll(".form-input")
        let instrumentosLista = []
        selectInstrumentos.forEach(selectInstrumento => {
            if(selectInstrumento.name == "Instrumentos"){
                instrumentosLista.push(selectInstrumento.value)
            }
        })

        let instrumentosString = instrumentosLista.join(",")
        
        // estado de seleccionada por defecto en false
        let seleccionada = 0

        // sacamos el nombre
        let nombre = document.querySelector("#preparacion").value

        // hacemos la solicitud a nuestro endpoint para crear la nueva comida

        console.log(ingredientes)
        const solicitud = {
            nombre: nombre,
            tipo_comida: tipoComida,
            tipo_bebida: null,
            instrumentos: instrumentosString,
            ingredientes: ingredientes,
            seleccionada: 0
        }

        console.log({solicitud})

        try{
            await fetch('http://localhost:1234/cocina', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(solicitud)
            });
            console.log("Comida creada")
        }
        catch(e){
            console.log(`Error: `, e)
        }
        alert("Comida creada correctamente")
        location.reload(true)
    })

    
    
};

function crearFormatoJSON(arr1, arr2) {
    // Verificar que ambos arreglos tengan la misma longitud
    if (arr1.length !== arr2.length) {
        throw new Error('Los arreglos deben tener la misma longitud');
    }

    const objetoJSON = {};
    // Iterar sobre los arreglos
    for (let i = 0; i < arr1.length; i++) {
        const key = arr1[i];
        const value = parseFloat(arr2[i]); // Parsear el valor para asegurarse de que sea numérico si es posible
        objetoJSON[key] = value;
    }
    return JSON.stringify(objetoJSON);
}


// Ejemplo de uso:
const arr1 = ["12", "25", "34"];
const arr2 = ["21", "32", "47"];
const resultado = crearFormatoJSON(arr1, arr2);
console.log(resultado); // Output: '{"1":2,"2":3,"3":4}'¿

