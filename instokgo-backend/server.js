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

