import z from "zod";

const schema_salon = z.object({
    // valida si el presupuesto es un numero float, positivo
    presupuesto : z.number().positive().float(),
    // valida si el inicio del evento es valido
    inicio_evento : z.string().datetime(),
    // valida si el final del evento es un datetime y mayor al inicio del evento
    final_evento : z.string().datetime().refine((final, ctx) => {
        const inicio_evento = ctx.parsedData.inicio_evento;
        return final > inicio_evento;
    }, {
        message: 'El final del evento debe de ser una variable de tipo datetime, o debe de ser mayor que el tiempo de inicio del evento'
    }),
    // valida si el pago_incial es un numero float, positivo
    pago_inicial : z.number().positive().float(),
    // valida si el pago_final es un numero float, positivo
    pago_final : z.number().positive().float(),
})


export function validateSalon (input) {
    return schema_salon.safeParse(input)
  }
  
export function validatePartialSalon (input) {
    return schema_salon.partial().safeParse(input)
}