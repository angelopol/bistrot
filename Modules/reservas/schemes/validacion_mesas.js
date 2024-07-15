import z from 'zod';

const validacion_Inventario_Mesas = z.object({
    descripcion: z.string({
        required_error: 'La descripción es requerida',
        invalid_type_error: 'La descripción debe ser un texto',
    }).max(400, { message: 'La descripción debe tener como máximo 400 caracteres' }),

    numero_sillas: z.number({
        required_error: 'El número de sillas es requerido',
        invalid_type_error: 'El número de sillas debe ser un número',
    }).positive({ message: 'El número de sillas debe ser positivo' }).max(4, { message: 'El número de sillas debe ser menor a 40' }),

    status: z.enum(['O', 'D'], { message: 'El status debe ser ocupado o disponible' }),



})

export function validarMesas(datos) {
    return validacion_Inventario_Mesas.safeParse(datos);
}
    
    
