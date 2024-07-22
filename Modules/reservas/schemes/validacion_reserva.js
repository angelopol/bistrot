import z from 'zod';

const validacion_reserva = z.object({
    personas: z.string().min(1).max(4).regex(/^\d+$/),

    cedula:z.string().min(7).max(8).regex(/^\d+$/),

    iddescripcion: z.string({required_error: 'la descripcion es requerida',
        invalid_type_error: 'la descripcion debe ser un string'
    }).max(50, {message: 'la descripcion debe tener menos de 100 caracteres'}),

    idtelefono: z.string({required_error: 'El teléfono es requerido',
        invalid_type_error: 'El teléfono debe ser un string'
    }).min(11, {message: 'El teléfono debe tener al menos 12 caracteres'}).max(11, {message: 'El teléfono debe tener menos de 15 caracteres'}),

    nombre: z.string({required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un string'
    }).max(50, {message: 'El nombre debe tener menos de 50 caracteres'}),
    fecha: z.string({required_error: 'La fecha es requerida',
        invalid_type_error: 'La fecha debe ser un string'
    }).max(50, {message: 'La fecha debe tener menos de 50 caracteres'}),
    hora_inicio: z.string({required_error: 'La hora de inicio es requerida',
        invalid_type_error: 'La hora de inicio debe ser un string'
    }).max(50, {message: 'La hora de inicio debe tener menos de 50 caracteres'}),
    hora_fin: z.string({required_error: 'La hora de fin es requerida',
        invalid_type_error: 'La hora de fin debe ser un string'
    }).max(50, {message: 'La hora de fin debe tener menos de 50 caracteres'}),
    idzona: z.string({required_error: 'La ubicación es requerida',
        invalid_type_error: 'La ubicación debe ser un string'
    }).max(50, {message: 'La ubicación debe tener menos de 50 caracteres'}),

    idmesa:z.string()


})

export function validar_reserva(reserva) {
    return validacion_reserva.safeParse(reserva);
}