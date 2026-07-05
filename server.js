// ============================================================================
// SERVICIO WEB DE AUTENTICACIÓN - PLATAFORMA INSTOKGO
// Evidencia: GA7-220501096-AA5-EV01
// ============================================================================

const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000; // Puerto independiente para no chocar con el Frontend de Vite

// Middleware necesario para que el servidor entienda datos en formato JSON
app.use(express.json());

// Base de datos simulada en memoria para los usuarios de Instokgo
const usuariosInstokgoDB = [];

/**
 * SERVICIO WEB: REGISTRO DE USUARIOS
 * POST /api/instokgo/register
 * Recibe usuario y contraseña, cifra la contraseña y la almacena.
 */
app.post('/api/instokgo/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validación 1: Verificar que los campos no lleguen vacíos
        if (!username || !password) {
            return res.status(400).json({ error: "El usuario y la contraseña son obligatorios." });
        }

        // Validación 2: Evitar usuarios duplicados en Instokgo
        const existeUsuario = usuariosInstokgoDB.find(user => user.username === username);
        if (existeUsuario) {
            return res.status(400).json({ error: "Este nombre de usuario ya está registrado." });
        }

        // Seguridad: Encriptación de contraseña mediante hashing con Salt de 10 rondas
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        // Guardar el registro de forma segura en la base de datos simulada
        const nuevoUsuario = { username, password: passwordEncriptada };
        usuariosInstokgoDB.push(nuevoUsuario);

        return res.status(201).json({ mensaje: "Usuario de Instokgo registrado con éxito." });

    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor en el registro." });
    }
});

/**
 * SERVICIO WEB: INICIO DE SESIÓN (LOGIN)
 * POST /api/instokgo/login
 * Compara las credenciales y devuelve las respuestas exactas de la guía.
 */
app.post('/api/instokgo/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validación 1: Verificar el envío de credenciales completas
        if (!username || !password) {
            return res.status(400).json({ error: "Por favor, ingrese usuario y contraseña." });
        }

        // Buscar el usuario dentro de nuestro arreglo en memoria
        const usuarioValido = usuariosInstokgoDB.find(user => user.username === username);

        // Si el usuario no existe, se deniega el acceso de inmediato
        if (!usuarioValido) {
            return res.status(401).json({ error: "Error en la autenticación." });
        }

        // Validación 2: Comparar contraseñas comparando los hashes encriptados
        const verificarPassword = await bcrypt.compare(password, usuarioValido.password);

        if (verificarPassword) {
            // Mensaje requerido textualmente por la guía de evaluación del SENA
            return res.status(200).json({ mensaje: "Autenticación satisfactoria." });
        } else {
            // Mensaje de error requerido textualmente por la guía de evaluación del SENA
            return res.status(401).json({ error: "Error en la autenticación." });
        }

    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor en el inicio de sesión." });
    }
});

// Despliegue del servicio web en entorno local
app.listen(PORT, () => {
    console.log(`[Instokgo-Backend] Servicio Web activo en: http://localhost:${PORT}`);
});
