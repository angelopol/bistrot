import z from "zod"
// Validaciones de la tabla Producto
const Productoschema = z.object({
    NombreP: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Unidades: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Consumo: z.string().max(200).regex(/^[a-zA-Z\s]+$/)
})

export function ValidarProducto(input){
    return Productoschema.safeParse(input)
}
export function validarProductoM(input){
    return Productoschema.partial(input)
}