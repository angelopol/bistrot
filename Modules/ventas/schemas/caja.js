import z from "zod";

const schema_caja = z.object({
    // valida si el turno_horario es correcto
    turno_horario : z.string().optional(),
    // valida si la tasa del dia es un numero positivo
    tasa_del_dia : z.number().nonnegative({ message: 'La tasa del dia debe ser un número positivo' }),
    // valida si la apertura es un datetime
    // valida si el monto_inicial es un numero float, positivo
    monto_inicial : z.number().nonnegative({ message: 'El monto inicial debe ser un número positivo' }),
    // valida si el monto_final es un numero float, positivo
    monto_final : z.number().nonnegative({ message: 'El monto final debe ser un número positivo' }),
    // valida si el ingresos es un numero float, positivo
});


const cajaData = {
    turno_horario : 'noche',
    tasa_del_dia : 10,
    apertura: '2023-06-30T12:30:00.000Z',
    cierre: '2023-06-30T12:00:00.000Z',
    monto_inicial : 800,
    monto_final : 54,
    ingresos : 1000,
    egresos : 20.5
  };


export function validateCaja (input) {
    return schema_caja.safeParse(input)
  }
  
export function validatePartialCaja (input) {
    return schema_caja.partial().safeParse(input)
}