import z from "zod";

const schema_cliente = z.object({
    // Validamos si es un string
    nombre_cliente_empresa: z.string().min(1, { message: 'El nombre del cliente o empresa no puede estar vacío' }),
    // Validamos si es un string
    rif_cedula: z.string().min(8, { message: 'El RIF o cédula no puede estar vacío' }),
    // Validamos si es un string
    direccion: z.string().min(1, { message: 'La dirección no puede estar vacía' }),
    // Validamos si es un string y refinamos para que sea 'natural' o 'juridico'
    tipo_estado: z.string().refine(estado => ['natural', 'juridico'].includes(estado), {
        message: 'El tipo de estado debe ser "natural" o "juridico"'
    }),
    // Validamos si es un número de teléfono válido
    telefono: z.string().refine(telefono => {
        const phone = telefono.replace(/\s/g, '').replace(/-/g, ''); // Eliminar espacios en blanco y guiones
        const tieneDigitos = /^\d+$/.test(phone); // Verificar si el número de teléfono tiene solo dígitos
        const longitudValida = phone.length === 10; // Verificar la longitud del número de teléfono
        return tieneDigitos && longitudValida;
    }, {
        message: 'El número de teléfono es inválido'
    }),
    // Validamos si es un correo electrónico válido
    correo_electronico: z.string().email({ message: 'El correo electrónico no es válido' }),
})



export function validateCliente (input) {
    return schema_cliente.safeParse(input)
  }
  
export function validatePartialCliente (input) {
    return schema_cliente.partial().safeParse(input)
}

/*
// Ejemplo de uso
const direccion = 'Av. Libertador, Edif. Centro Comercial, Piso 3, Apto. 4B';

try {
  const validatedDireccion = schema_cliente.safeParse(direccion);
  console.log('Dirección venezolana válida:', validatedDireccion);
} catch (error) {
  console.error('Error de validación de dirección venezolana:', error.message);
}
*/