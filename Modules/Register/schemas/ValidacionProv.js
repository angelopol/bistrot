import z from "zod"
// Validacion de la tabla de proveedor

const ProvSchema = z.object({
    Rif: z.string().max(200).regex(/^j-[0-9]{9}$/),

    Nombre_Empresa: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Dire_fiscal: z.string().max(255).regex(/^[a-zA-Z0-9]+$/),

    Correo: z.string().max(200).regex(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/),

    Nombre_Responsa: z.string().max(200).regex(/^[a-zA-Z\s]+$/),

    Tlf: z.string().max(200).regex(/^04(14|12|24|26)[0-9]{7}$/),

    Producto_Proveedor: z.string().max(200).regex(/^[a-zA-Z\s]+$/)
})

export function ValidarProv(input){
    return ProvSchema.safeParse(input)
}
export function ValidarProvM(input){
    return ProvSchema.partial(input)
}