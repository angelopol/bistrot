import z from "zod";

const schema_factura = z.object({
    // Validación del monto como un número positivo
    monto: z.number().positive({ message: 'El monto debe ser un número positivo' }),
    // Validación del IVA como un número positivo
    iva: z.number().positive({ message: 'El IVA debe ser un número positivo' }),
    // Validación del consumo como un objeto JSON con claves numéricas
    consumo : z.string(),
    status_pedido : z.number().min(1).max(5), 
    mesa : z.number().min(1).max(9).positive({ message: 'El numero de la mesa debe ser un número positivo' }),
    zona : z.string().refine(zona_pedido => {
        return ['general', 'terraza'].includes(zona_pedido);
    }, {
        message: 'La zona debe de ser un string y estar entre (general y terraza)'
    } ), 
});


export function validateFactura (input) {
    return schema_factura.safeParse(input)
}

export function validatePartialFactura (input) {
    return schema_factura.partial().safeParse(input)
}