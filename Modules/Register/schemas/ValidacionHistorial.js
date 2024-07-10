import z from "zod"

const HistorialSchema = z.object({
    Pago: z.string({
        invalid_type_error: "El dato Pago tiene que ser una string"
    }).max(200, "El dato pago deber tener como maxiomo 200 caracteres"),

    Producto: z.string({
        invalid_type_error: "El dato producto tiene que ser una string"
    }).max(200, 'El dato producto debe tener como maximo 200 caracteres'),

    Cantidad: z.number().nonnegative("El dato Cantidad solo acepta numeros positivos"),
    Precio: z.number().nonnegative("El dato precio solo acepta numeros positivos"),

    Nombre_proveedor: z.string({
        invalid_type_error: 'El dato Nombre_proveedor tiene que ser una string'
    }).max(200, 'El dato Nombre_proveedor deber tener como maximo 200 caracteres'),

    Autorizacion: z.string({
        invalid_type_error: "El dato Autorizacion tiene que ser una string"
    }).max(200,'El dato Autorizacion deber tener como maximo 200 caracteres')

})

export function validarHistorial(input){
    return HistorialSchema.safeParse(input)
}