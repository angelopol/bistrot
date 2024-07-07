import z from "zod";

const schema_salon = z.object({
    // valida si el presupuesto es un numero float, positivo
    presupuesto : z.number().positive(),
    // valida si el inicio del evento es valido
    inicio_evento : z.string().datetime(),
    // valida si el final del evento es un datetime y mayor al inicio del evento
    final_evento : z.string().datetime(),
    // valida si el pago_incial es un numero float, positivo
    pago_inicial : z.number().positive(),
    // valida si el pago_final es un numero float, positivo
    pago_final : z.number().positive(),
    }).refine(data => data.cierre > data.apertura, {
        message : 'El final del evento debe de ser una variable de tipo datetime, o debe de ser mayor que tiempo inicial del evento',
});


export function validateSalon (input) {
    return schema_salon.safeParse(input)
  }
  
export function validatePartialSalon (input) {
    return schema_salon.partial().safeParse(input)
}