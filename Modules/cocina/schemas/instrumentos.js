import z from "zod"

const instrumentoSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Instrumento nombre must be a string',
    required_error: 'Instrumento nombre is required.'
  }),
  funciona: z.number().int().min(0).max(1)({
    invalid_type_error: 'Instrumento funciona must be a boolean (0/1)',
    required_error: 'Instrumento funciona is required.'
  }),
})

export function validateInstrumento (input) {
  return instrumentoSchema.safeParse(input)
}

export function validatePartialInstrumento(input) {
  return instrumentoSchema.partial().safeParse(input)
}