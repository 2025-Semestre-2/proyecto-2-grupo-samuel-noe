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

const getComodidades = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarHabitacionComodidad');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComodidad = async (req, res) => {
    const { idTipoHabitacion, descripcion } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('Descripcion', sql.NVarChar, descripcion)
            .execute('SP_RegistrarHabitacionComodidad');
        res.json({ message: 'Comodidad agregada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateComodidad = async (req, res) => {
    const { id } = req.params;
    const { idTipoHabitacion, descripcion } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdComodidad', sql.Int, parseInt(id))
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('Descripcion', sql.NVarChar, descripcion)
            .execute('SP_ModificarHabitacionComodidad');
        res.json({ message: 'Comodidad actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteComodidad = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdComodidad', sql.Int, parseInt(id))
            .execute('SP_EliminarHabitacionComodidad');
        res.json({ message: 'Comodidad eliminada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTiposHabitacion, getComodidades, createComodidad, updateComodidad, deleteComodidad };