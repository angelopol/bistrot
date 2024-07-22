// schemas/entradas.js
import * as yup from 'yup';

const entradaSchema = yup.object().shape({
    cedula: yup.string().required('La cédula es requerida'),
    // agregar otros campos necesarios con sus validaciones correspondientes
});

export const validateEntrada = async (data) => {
    
    
    return { success: true };
    
};
