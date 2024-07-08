import z from "zod";

const schema_factura = z.object({
    // Validación del monto como un número positivo
    monto: z.number().positive({ message: 'El monto debe ser un número positivo' }),
    // Validación del IVA como un número positivo
    iva: z.number().positive({ message: 'El IVA debe ser un número positivo' }),
    // Validación del consumo como un objeto JSON con claves numéricas
    consumo: z.string().refine(value => {
        try {
            const parsedIngredients = JSON.parse(value);
            if (typeof parsedIngredients !== 'object') return false; // No es un objeto válido
            for (const key in parsedIngredients) {
                if (!/^\d+$/.test(key)) return false; // Las claves deben ser números enteros
            }
            return true;
        } catch (error) {
            return false; // No se pudo analizar como JSON válido
        }
    }, {
        message: 'Los ingredientes deben ser un objeto en formato JSON con claves numéricas'
    }),
    status_pedido : z.number().min(1).max(4), 
});


export function validateFactura (input) {
    return schema_factura.safeParse(input)
  }
  
export function validatePartialFactura (input) {
    return schema_factura.partial().safeParse(input)
}