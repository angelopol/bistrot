import z from 'zod';

const validacion_reserva = z.object({
    numero_reserva: z.number({required_error: 'El número de reserva es requerido',
        invalid_type_error: 'El número de reserva debe ser un número'
    }).positive({message: 'El número de reserva debe ser positivo'}),

    confirmado: z.boolean({required_error: 'El campo confirmado es requerido',
        invalid_type_error: 'El campo confirmado debe ser un booleano'
    }),

    cantidad_personas: z.number({required_error: 'La cantidad de personas es requerida',
        invalid_type_error: 'La cantidad de personas debe ser un número'
    }).positive({message: 'La cantidad de personas debe ser positiva'}).max(40, {message: 'La cantidad de personas debe ser menor a 40'}),

    fecha_inicio: z.date({required_error: 'La fecha de inicio es requerida',
        invalid_type_error: 'La fecha de inicio debe ser una fecha'
    }),

    fecha_fin: z.date({required_error: 'La fecha de fin es requerida',
        invalid_type_error: 'La fecha de fin debe ser una fecha'
    }),
    tipo_evento: z.string({required_error: 'El tipo de evento es requerido',
        invalid_type_error: 'El tipo de evento debe ser un string'
    }).max(500, {message: 'El tipo de evento debe tener menos de 100 caracteres'}),

})

export function validar_reserva(reserva) {
    return validacion_reserva.safeParse(reserva);
}
