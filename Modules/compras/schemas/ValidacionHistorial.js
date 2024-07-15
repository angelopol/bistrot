import z from "zod"

const HistorialSchema = z.object({
    Pago: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Producto: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Cantidad: z.string().regex(/^[0-9]+$/),

    Precio: z.string().regex(/^[0-9]+$/),

    Nombre_proveedor: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Autorizacion: z.string().max(200).regex(/^[a-zA-Z\s]+$/)

})

export function validarHistorial(input){
    return HistorialSchema.safeParse(input)
}