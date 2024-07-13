import z from 'zod';

const validacion_reserva_mesas = z.object({
    numero_reserva: z.number({  required_error: 'El número de reserva es requerido',
        invalid_type_error: 'El número de reserva debe ser un número'
    }).positive({message: 'El número de reserva debe ser positivo'}).min(1, {message: 'El número de reserva debe ser mayor a 0'})
})

export function validarReservaMesas(datos) {
    return validacion_reserva_mesas.safeParse(datos);
}

    