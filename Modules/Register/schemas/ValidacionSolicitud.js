import z from "zod"

//Validacion para la tabla de solicitudes
const SolicitudSchema = z.object({
    Deparatmento: z.string({
        required_error: "El dato deparatmento es requerido",
        invalid_type_error: "El dato departamento debe ser una string"
    }).max(200, 'El dato deparatmento debe tener maximo 200 caracteres'),

    ID_Empleado: z.number({
        required_error: "El dato ID_Empleado es requerido",
        invalid_type_error: "El dato ID-Empleado tiene que ser un numero"
    }).int().positive('El dato ID_Empleado siempre es un numero positivo'),

    Cantidad: z.number({
        required_error: "El dato cantidad es requerido",
        invalid_type_error: "El dato Cantidad tiene que ser un numero"
    }).int().positive('El dato Cantidad siempre tiene que ser un numero positivo'),

    Nombre_Producto: z.string({
        required_error:"El dato Nombre_producto es requerido",
        invalid_type_error: "El dato Nombre_Producto tiene que ser una string"
    }).max(200,'El dato Nombre_Producto debe tener maximo 200 caracteres'),

    Aprobada: z.boolean({
        required_error: "El dato Aprobada es requerido",
        invalid_type_error: "El dato Aprobada siempre tiene que ser un boolean"
    }),

    DETALLE: z.string({
        required_error: "El dato DETALLE es requirido",
        invalid_type_error: "El dato DETALLE siempre es una string"
    }).max(255, 'El dato DETALLE debe tener como maximo 255 caracteres')
})
export function ValidarSolicitudes(input){
    return SolicitudSchema.safeParse(input)
}

export function ValidarSolicitudesM(input){
    return SolicitudSchema.partial(input)
}