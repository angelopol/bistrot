import z from "zod"

const HistorialSchema = z.object({
    Pago: z.string({
        required_error: "El dato Pago es requerido",
        invalid_type_error: "El dato Pago tiene que ser una string"
    }).max(200, "El dato pago deber tener como maxiomo 200 caracteres"),

    Producto: z.string({
        required_error: "El dato Producto es requerido",
        invalid_type_error: "El dato producto tiene que ser una string"
    }).max(200, 'El dato producto debe tener como maximo 200 caracteres'),

    Cantidad: z.number({
        required_error: "El dato cantidad es requerido",
        invalid_type_error: "El dato cantidad siempre tiene que ser un numero"
    }).positive("El dato Cantidad solo acepta numeros positivos"),
    Precio: z.number({
        required_error: "El dato Precio es requerido",
        invalid_type_error: "El dato Precio siempre es un numero"
    }).positive("El dato precio solo acepta numeros positivos"),

    Nombre_proveedor: z.string({
        required_error: "El dato Nombre_proveedor es requerido",
        invalid_type_error: 'El dato Nombre_proveedor tiene que ser una string'
    }).max(200, 'El dato Nombre_proveedor deber tener como maximo 200 caracteres'),

    Autorizacion: z.string({
        required_error: "El dato Autorizacion es requerido",
        invalid_type_error: "El dato Autorizacion tiene que ser una string"
    }).max(200,'El dato Autorizacion deber tener como maximo 200 caracteres')

})

export function validarHistorial(input){
    return HistorialSchema.safeParse(input)
}