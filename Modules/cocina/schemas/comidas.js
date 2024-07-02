import z from "zod"

const comidaSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'comida nombre must be a string',
    required_error: 'Comida nombre is required.'
  }),
  tipo_comida: z.string().nullable().optional(),
  tipo_bebida: z.string().nullable().optional(),
  instrumentos: z.string().nullable().refine(value => {
    // Permitir que `value` sea `null`
    if (value === null) return true;
    
    // Validar que `value` es una cadena no vacía y tiene el formato "nombre,otronombre,..."
    if (typeof value !== 'string') return false;
    const parts = value.split(',');
    return parts.every(part => part.trim() !== ''); // Cada parte no debe estar vacía
  }, {
    message: 'Instrumentos debe ser una cadena con el formato "nombre,otronombre,..." o null'
  }),
  ingredientes:  z.string().refine(value => {
    const pairs = value.split(',');
    return pairs.every(pair => {
      const [nombre, numero] = pair.split(':');
      return nombre.trim() !== '' && !isNaN(Number(numero.trim()));
    });
  }),
})
export function validateComida (input) {
  return comidaSchema.safeParse(input) // esto es un objeto que tiene tres propiedades. success que es un booleano , data que contiene los datos del esquema y error que contiene los errores si los hay
}

export function validatePartialComida (input) {
  return comidaSchema.partial().safeParse(input)
}
