import z from "zod"
// Validacion de la tabla de proveedor

const ProvSchema = z.object({
    rif: z.string().max(200).regex(/^\d{9}$/, "El RIF debe contener exactamente 9 dígitos numéricos"), 

    nombre_empresa: z.string().max(200),

    Dire_Fiscal: z.string().max(255),

    Correo: z.string().max(200).regex(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/),

    nombre_responsa: z.string().max(200),

    Tlf: z.string().max(200).regex(/^04(14|12|24|26)[0-9]{7}$/),

    ProveedorProd: z.string().max(200).regex(/^[a-zA-Z\s]+$/)
})

export function ValidarProv(input){
    return ProvSchema.safeParse(input)
}
export function ValidarProvM(input){
    return ProvSchema.partial(input)
}