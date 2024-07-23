import jwt from 'jsonwebtoken'; // ES6

// luego ver si se hace mediante modulo, usuario, y contrasena
// Este es de manera temporal para permisos de cocina, liego modificar para todos los modulos que intervengan 

// Middleware para verificar y decodificar el token 
export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extraer el token de Authorization: Bearer <token>

        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido' });
            }
            req.usuario = decoded; // Establecer el usuario decodificado en el objeto de solicitud
            next();
        });
    } else {
        res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }
}

// Middleware para verificar los permisos de acceso
export function checkPermission(req, res, next) {
    const usuario = req.usuario;

    if (usuario && usuario.usuario === 'cocina') {
        next(); // Si el usuario es del equipo de cocina, permitir el acceso
    } else {
        res.status(403).send('Acceso denegado. Solo el equipo de cocina puede realizar esta acción');
    }
}