const { getConnection, sql } = require('../config/db');

const getActividades = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTipoServicio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createActividad = async (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Int, parseInt(costo))
            .execute('SP_RegistrarTipoServicio');
        res.json({ message: 'Actividad registrada correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateActividad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, costo } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombre)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Int, parseInt(costo))
            .execute('SP_ModificarTipoServicio');
        res.json({ message: 'Actividad actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteActividad = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .execute('SP_EliminarTipoServicio');
        res.json({ message: 'Actividad eliminada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchActividades = async (req, res) => {
    const { criterio } = req.query; // Recibe ?criterio=...
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Criterio', sql.NVarChar, criterio)
            .execute('SP_BuscarTipoServicio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getActividades, createActividad, updateActividad, deleteActividad, searchActividades };