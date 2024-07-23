import z from "zod"

//Validacion para la tabla de solicitudes
const SolicitudSchema = z.object({
    depar: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    id_emp: z.string().regex(/^[0-9]+$/),

    cant: z.string().regex(/^[0-9]+$/),

    nombre_producto: z.string().max(200),

    detalle: z.string().max(255)
})
export function ValidarSolicitudes(input){
    return SolicitudSchema.safeParse(input)
}

export function ValidarSolicitudesM(input){
    return SolicitudSchema.partial(input)
}