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

const getHabitaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarHabitaciones');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createHabitacion = async (req, res) => {
    const { idTipoHabitacion, numeroHabitacion, estado } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('NumeroHabitacion', sql.Int, parseInt(numeroHabitacion))
            .input('Estado', sql.NVarChar, estado)
            .execute('SP_RegistrarHabitacion');
        res.json({ message: 'Habitación registrada correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateHabitacion = async (req, res) => {
    const { id } = req.params;
    const { idTipoHabitacion, numeroHabitacion, estado } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHabitacion', sql.Int, parseInt(id))
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('NumeroHabitacion', sql.Int, parseInt(numeroHabitacion))
            .input('Estado', sql.NVarChar, estado)
            .execute('SP_ModificarHabitacion');
        res.json({ message: 'Habitación actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteHabitacion = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHabitacion', sql.Int, parseInt(id))
            .execute('SP_EliminarHabitacion');
        res.json({ message: 'Habitación eliminada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTiposHabitacion, getHabitaciones, createHabitacion, updateHabitacion, deleteHabitacion };