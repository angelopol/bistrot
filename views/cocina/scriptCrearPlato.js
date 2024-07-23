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
                        <option value="pollo">Pollo</option>
                        <option value="queso">Queso</option>
                        <option value="huevo">Huevo</option>
                        <option value="bacalao">Bacalao</option>
                    </select>
                    <input type="number" class="form-input" name="PesoProteina" placeholder="Peso (g)"  style = "width: 50px"  />
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
                        <option value="tomate">Tomate</option>
                        <option value="zanahoria">Zanahoria</option>
                        <option value="cebolla">Cebolla</option>
                        <option value="papa">Papa</option>
                        <option value="apio">Apio</option>
                        <option value="ajo">Ajo</option>
                        <option value="champiñones">Champiñones</option>
                        <option value="berenjena">Berenjena</option>
                        <option value="fresa">Fresa</option>
                        <option value="patilla">Patilla</option>
                        <option value="manzana">Manzana</option>
                        <option value="banana">Banana</option>
                        <option value="limon">Limon</option>
                        <option value="lechuga">Lechuga</option>
                        <option value="pepino">Pepino</option>
                        <option value="aji">Aji</option>
                        <option value="pimenton">Pimenton</option>
                        <option value="cebollin">Cebollin</option>
                    </select>
                    <input type="number" class="form-input" name="PesoVerduras" placeholder="Peso (g)" style = "width: 50px" />
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
                        <option value="espelta">Espelta</option>
                        <option value="vinagre">Vinagre</option>
                        <option value="pasta">Pasta</option>
                        <option value="aceite">Aceite</option>
                        <option value="harina">Harina</option>
                        <option value="leche">Leche</option>
                        <option value="azucar">Azucar</option>
                        <option value="chocolate">Chocolate</option>
                    </select>
                    <input type="number" class="form-input" name="PesoOtros" placeholder="Peso (g)" style = "width: 50px" />
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
                        <option value="cocinaA">cocinaA</option>
                        <option value="cocinaB">cocinaB</option>
                        <option value="cocinaC">cocinaC</option>
                        <option value="cocinaD">cocinaD</option>
                        <option value="hornoA">hornoA</option>
                        <option value="hornoB">hornoB</option>
                        <option value="hornoC">hornoC</option>
                        <option value="hornoD">hornoD</option>
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
    
    botonRegistrar.addEventListener("click",()=> {
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
        const value = parseInt(arr2[i]); // Parsear el valor para asegurarse de que sea numérico si es posible
        objetoJSON[key] = value;
    }
    return JSON.stringify(objetoJSON);
}


// Ejemplo de uso:
const arr1 = ["12", "25", "34"];
const arr2 = ["21", "32", "47"];
const resultado = crearFormatoJSON(arr1, arr2);
console.log(resultado); // Output: '{"1":2,"2":3,"3":4}'¿{"12":21,"25":32,"34":47}
