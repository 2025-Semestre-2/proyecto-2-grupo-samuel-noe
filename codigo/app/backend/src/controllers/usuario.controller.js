const { getConnection, sql } = require('../config/db');

const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT Usuario, TipoUsuario FROM Usuario');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    const { usuario, password, tipoUsuario } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Usuario', sql.NVarChar, usuario)
            .input('Password', sql.NVarChar, password)
            .input('TipoUsuario', sql.NVarChar, tipoUsuario)
            .execute('SP_RegistrarUsuario');
        res.json({ message: 'Usuario registrado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { usuario } = req.params;
    const { password, tipoUsuario } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Usuario', sql.NVarChar, usuario)
            .input('NuevoPassword', sql.NVarChar, password)
            .input('NuevoTipo', sql.NVarChar, tipoUsuario)
            .execute('SP_ModificarUsuario');
        res.json({ message: 'Usuario actualizado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    const { usuario } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Usuario', sql.NVarChar, usuario)
            .execute('SP_EliminarUsuario');
        res.json({ message: 'Usuario eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };