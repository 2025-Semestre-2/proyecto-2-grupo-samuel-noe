const { getConnection, sql } = require('../config/db');

const login = async (req, res) => {
    const { user, password } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Usuario', sql.NVarChar, user)
            .input('Password', sql.NVarChar, password)
            .output('EsAutenticado', sql.Bit)
            .output('Rol', sql.NVarChar)
            .execute('SP_AutenticarUsuario');

        const { EsAutenticado, Rol } = result.output;

        if (EsAutenticado) {
            res.json({ success: true, rol: Rol, user, message: 'Login exitoso' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { login };