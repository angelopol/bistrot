// schemas/entradas.js
import * as yup from 'yup';

const entradaSchema = yup.object().shape({
    cedula: yup.string().required('La cédula es requerida'),
    // agregar otros campos necesarios con sus validaciones correspondientes
});

export const validateEntrada = async ({ cedula }) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM empleados WHERE cedula = ?',
            [cedula]
        );

        if (rows.length > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Cédula no encontrada' };
        }
    } catch (e) {
        console.error('Error validating cédula:', e);
        return { success: false, message: `Error validating cédula: ${e.message}` };
    }
};
