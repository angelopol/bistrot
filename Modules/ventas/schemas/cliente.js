import z from "zod";

const schema_cliente = z.object({
    // validamos si es un string
    nombre_cliente_empresa : z.string(),
    // validamos si es un string
    rif_cedula : z.string(),
    // validamos si es un string
    direccion : z.string(),
    // validamos si es un string
    tipo_estado : z.string().refine(estado => {
        return ['natural', 'juridico'].includes(estado);
    }, {
        message: 'El tipo de estado debe de ser natural o juridico'
    }),
    // validamos si es un numero de telefono
    telefono : z.string().refine(telefono => {
        // Eliminar espacios en blanco y guiones
        const phone = telefono.replace(/\s/g, '').replace(/-/g, '');
        
        // Verificar si el número de teléfono tiene solo dígitos
        const tieneDigitos = /^\d+$/.test(phone);
        if (!tieneDigitos) {
            return false;
        }
        
        // Verificar la longitud del número de teléfono
        const longitudValida = phone.length === 10;
        if (!longitudValida) {
            return false;
        }
        
        return true;
    }, {
        message: 'El numero de telefono es invalido'
    }),
    correo_electronico : z.string().email(),
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