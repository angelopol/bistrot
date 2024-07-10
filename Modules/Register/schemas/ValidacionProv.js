import z from "zod"
// Validacion de la tabal de proveedor

const ProvSchema = z.object({
    Rif: z.string({
        invalid_type_error: 'El dato rif tiene que ser una string'
    }).max(200, 'El dato rif debe tener como maximo 200 caracteres'),

    Nombre_Empresa: z.string({
        invalid_type_error: "El dato Nombre_Empresa tiene que ser una string"
    }).max(200, 'El dato Nombre_Empresa debe tener como maximo 200 caracteres'),

    Dire_fiscal: z.string({
        required_error: "El dato Dire_fiscal tiene que ser requerido",
        invalid_type_error: "El dato Dire_fiscal teien que ser una string"
    }).max(255, 'El dato Dire_fiscal debe tener como maximo 255 caracteres').nullable().optional(),

    Correo: z.string({
        required_error: "El dato Correo es requerido",
        invalid_type_error: "El dato Correo tiene que ser una string"
    }).max(200,'El dato Correo debe tener como maximo 200 caracteres'),

    Nombre_Responsa: z.string({
        required_error: "El dato Nombre_Responsa es requerido",
        invalid_type_error: "El dato Nombre_Responsa tiene que ser una string"
    }).max(200, 'El dato Nombre_Responsa debe tener como maximo 200 caracteres'),

    Tlf: z.string({
        required_error: "El dato Tlf es requerido",
        invalid_type_error: "El dato Tlf tiene que ser una string"
    }).max(200, "El dato Tlf debe tener como maximo 200 caracteres"),

    Producto_Proveedor: z.string({
        required_error: "El dato Producto_Proveedor es requerido",
        invalid_type_error: "El dato Producto_Proveedor tiene que ser una string"
    }).max(200, 'El dato Producto_Proveedor debe tener como maximo 200 caracteres')
})

export function ValidarProv(input){
    return ProvSchema.safeParse(input)
}
export function ValidarProvM(input){
    return ProvSchema.partial(input)
}