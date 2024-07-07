import z from "zod";

const schema_factura = z.object({
    // valida si el monto es un numero float, positivo
    monto : z.number().positive(),
    // valida si el iva es un numero float, positivo
    iva : z.number().positive(),
    consumo : z.string().refine(value => {
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
        message: 'Ingredientes debe ser un objeto en formato JSON con claves numéricas.'
    }),
})


export function validateFactura (input) {
    return schema_factura.safeParse(input)
  }
  
export function validatePartialFactura (input) {
    return schema_factura.partial().safeParse(input)
}