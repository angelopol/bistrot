import z from 'zod';

const validacionInventarioMesas = z.object({
    descripcion: z.string({
        required_error: 'La descripción es requerida',
        invalid_type_error: 'La descripción debe ser un texto',
    }).max(400, { message: 'La descripción debe tener como máximo 400 caracteres' }),

    numero_sillas: z.number({
        required_error: 'El número de sillas es requerido',
        invalid_type_error: 'El número de sillas debe ser un número',
    }).positive({ message: 'El número de sillas debe ser positivo' }).max(40, { message: 'El número de sillas debe ser menor a 40' }),

    status: z.enum(['O', 'D'], { message: 'El status debe ser ocupado o disponible' }),

    confirmado: z.boolean({ required_error: 'El campo confirmado es requerido',
        invalid_type_error: 'El campo confirmado debe ser un booleano'
    }),

})

export function validarInventarioMesas(datos) {
    return validacionInventarioMesas.safeParse(datos);
}
    
    
