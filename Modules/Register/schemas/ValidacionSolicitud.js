import z from "zod"

//Validacion para la tabla de solicitudes
const SolicitudSchema = z.object({
    Deparatmento: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    ID_Empleado: z.string().regex(/^[0-9]+$/),

    Cantidad: z.string().regex(/^[0-9]+$/),

    Nombre_Producto: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Aprobada: z.boolean(),

    DETALLE: z.string().max(255).regex(/^[a-zA-Z\s]+$/)
})
export function ValidarSolicitudes(input){
    return SolicitudSchema.safeParse(input)
}

export function ValidarSolicitudesM(input){
    return SolicitudSchema.partial(input)
}