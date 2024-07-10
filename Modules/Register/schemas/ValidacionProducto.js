import z from "zod"
// Validaciones de la tabla Producto
const Productoschema = z.object({
    NombreP: z.string({
        invalid_type_error: 'El dato NombreP tiene que ser una string'
    }).max(200, 'El dato NombreP deber tener como maximo 200 caracteres'),

    Unidades: z.string({
        invalid_type_error: 'El dato Unidades tiene que ser una string'
    }).max(200, 'El dato Unidades de compra deber tener como maximo 200 caracteres'),

    Consumo: z.string({
        invalid_type_error: 'El dato Consumo tiene que ser una string'
    }).max(200, 'El dato de las unidades de consumo deber tener como maximo 200 caracteres')
})

export function ValidarProducto(input){
    return Productoschema.safeParse(input)
}
export function validarProductoM(input){
    return Productoschema.partial(input)
}