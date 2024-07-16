import z from 'zod';

const validacion_reserva = z.object({
    personas: z.number({required_error: 'La cantidad de personas es requerida',
        invalid_type_error: 'La cantidad de personas debe ser un número'
    }).positive({message: 'La cantidad de personas debe ser positiva'}).max(40, {message: 'La cantidad de personas debe ser menor a 40'}),

    cedula: z.number({required_error: 'El ID del cliente es requerido',
        invalid_type_error: 'El ID del cliente debe ser un número'
    }).positive({message: 'El ID del cliente debe ser positivo'}).max(8, {message: 'El ID del cliente debe ser menor a 8'}).
    min(7, {message: 'El ID del cliente debe ser mayor a 7'}),

    descripcion: z.string({required_error: 'El tipo de evento es requerido',
        invalid_type_error: 'El tipo de evento debe ser un string'
    }).max(50, {message: 'El tipo de evento debe tener menos de 100 caracteres'}),

    telefono: z.string({required_error: 'El teléfono es requerido',
        invalid_type_error: 'El teléfono debe ser un string'
    }).min(12, {message: 'El teléfono debe tener al menos 12 caracteres'}).max(12, {message: 'El teléfono debe tener menos de 15 caracteres'}),

})

export function validar_reserva(reserva) {
    return validacion_reserva.safeParse(reserva);
}
