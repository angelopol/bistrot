import z from "zod"

export const HistorialValidaschema = z.object({
    //FECHA: z.date(),
    Pago: z.string(),
    Producto: z.string(),
    Cantidad: z.number().nonnegative("La cantidad no se puede ser un numero negativo"),
    Precio: z.number().nonnegative("El precio no puede ser un numero negativo"),
    Nombre_Proveedor: z.string(),
    Autorizacion: z.string()
})