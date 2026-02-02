const { getConnection, sql } = require('../config/db');

const login = async (req, res) => {
    const { user, password } = req.body;

    try {
        const pool = await getConnection();
        
        // Ejecutar el SP de validación estricta
        const result = await pool.request()
            .input('Usuario', sql.NVarChar, user)
            .input('Contrasena', sql.NVarChar, password)
            .execute('SP_ValidarAccesoAdmin');

        // Si el SP no lanza error, el login es exitoso
        if (result.recordset.length > 0) {
            const usuarioData = result.recordset[0];
            res.json({ 
                success: true, 
                message: 'Bienvenido al Sistema', 
                user: usuarioData 
            });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

    } catch (error) {
        res.status(401).json({ 
            success: false, 
            error: error.message || 'Error de autenticación' 
        });
    }
};

module.exports = { login };