const { getConnection, sql } = require('../config/db');

const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarUsuarios');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    const { usuario, contrasena, tipoUsuario } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Usuario', sql.NVarChar, usuario)
            .input('Contrasena', sql.NVarChar, contrasena)
            .input('TipoUsuario', sql.NVarChar, tipoUsuario)
            .execute('SP_RegistrarUsuario');
        res.json({ message: 'Usuario creado exitosamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { contrasena, tipoUsuario } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Usuario', sql.NVarChar, id)
            .input('Contrasena', sql.NVarChar, contrasena)
            .input('TipoUsuario', sql.NVarChar, tipoUsuario)
            .execute('SP_ModificarUsuario');
        res.json({ message: 'Usuario actualizado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Usuario', sql.NVarChar, id)
            .execute('SP_EliminarUsuario');
        res.json({ message: 'Usuario eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };