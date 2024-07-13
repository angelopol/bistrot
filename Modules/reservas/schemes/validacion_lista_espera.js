import z from 'zod';

const validacion_Lista_Espera = z.object({
    cedula:z.number({required_error: 'La cédula es requerida',
        invalid_type_error: 'La cédula debe ser un número'
    }).positive({message: 'La cédula debe ser positiva'}).min(7, {message: 'La cédula debe tener al menos 7 dígitos'})
    .max(8, {message: 'La cédula debe tener máximo 8 dígitos'}),

    nombre: z.string({required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un string'
    }).max(100, {message: 'El nombre debe tener menos de 100 caracteres'}),

    apellido: z.string({required_error: 'El apellido es requerido',
        invalid_type_error: 'El apellido debe ser un string'
    }).max(100, {message: 'El apellido debe tener menos de 100 caracteres'}),

    cantidad_personas: z.number({required_error: 'La cantidad de personas es requerida',
        invalid_type_error: 'La cantidad de personas debe ser un número'
    }).positive({message: 'La cantidad de personas debe ser mayor a 0'}).max(40, {message: 'La cantidad de personas debe ser menor a 40'}),

})

export function validarListaEspera(datos) {
    return validacion_Lista_Espera.safeParse(datos);
}


