import z from 'zod';

const validacion_reserva = z.object({
    cantidad_personas: z.number({required_error: 'La cantidad de personas es requerida',
        invalid_type_error: 'La cantidad de personas debe ser un número'
    }).positive({message: 'La cantidad de personas debe ser positiva'}).max(40, {message: 'La cantidad de personas debe ser menor a 40'}),

    fecha_inicio: z.date({required_error: 'La fecha de inicio es requerida',
    }),

    fecha_fin: z.date({required_error: 'La fecha de fin es requerida',
    }),
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
