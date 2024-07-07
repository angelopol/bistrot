import z from "zod";

const schema_caja = z.object({
    // valida si el turno_horario es correcto
    turno_horario : z.string().refine(horario => {
        return ['dia', 'tarde', 'noche'].includes(horario);
    }, {
        message: 'El turno del horario debe de ser un string o contener las palabras requeridas de dicha variable'
    } ),
    // valida si la tasa del dia es un numero positivo
    tasa_del_dia : z.number().positive().float(),
    // valida si la apertura es un datetime
    apertura : z.string().datetime(),
    // valida si el cierre de la caja es un datetime y mayor a apertura de la caja
    cierre : z.string().datetime().refine((cierre, ctx) => {
        const apertura_caja = ctx.parsedData.apertura;
        return cierre > apertura_caja;
    }, {
        message: 'El cierra de la caja debe de ser una variable de tipo datetime, o debe de ser mayor que tiempo de apertura de la caja'
    }),
    // valida si el monto_inicial es un numero float, positivo
    monto_inicial : z.number().positive().float(),
    // valida si el monto_final es un numero float, positivo
    monto_final : z.number().positive().float(),
    // valida si el ingresos es un numero float, positivo
    ingresos : z.number().positive().float(),
    // valida si el egresos es un numero float, positivo
    egresos : z.number().positive().float(),
})


export function validateCaja (input) {
    return schema_caja.safeParse(input)
  }
  
export function validatePartialCaja (input) {
    return schema_caja.partial().safeParse(input)
}