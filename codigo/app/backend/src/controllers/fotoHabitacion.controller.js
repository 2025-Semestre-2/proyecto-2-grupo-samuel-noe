const { getConnection, sql } = require('../config/db');

const getTiposHabitacion = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTipoHabitacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFotos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarHabitacionFoto');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFoto = async (req, res) => {
    const { idTipoHabitacion, urlFoto } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('UrlFoto', sql.NVarChar, urlFoto)
            .execute('SP_RegistrarHabitacionFoto');
        res.json({ message: 'Foto agregada correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateFoto = async (req, res) => {
    const { id } = req.params;
    const { idTipoHabitacion, urlFoto } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdFoto', sql.Int, parseInt(id))
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('UrlFoto', sql.NVarChar, urlFoto)
            .execute('SP_ModificarHabitacionFoto');
        res.json({ message: 'Foto actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteFoto = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdFoto', sql.Int, parseInt(id))
            .execute('SP_EliminarHabitacionFoto');
        res.json({ message: 'Foto eliminada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTiposHabitacion, getFotos, createFoto, updateFoto, deleteFoto };