const { getConnection, sql } = require('../config/db');

const getServicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTipoServicio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createServicio = async (req, res) => {
    const { nombreTipoServicio, descripcion, costo } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombreTipoServicio)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Int, parseInt(costo))
            .execute('SP_RegistrarTipoServicio');
        res.json({ message: 'Servicio registrado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateServicio = async (req, res) => {
    const { id } = req.params;
    const { nombreTipoServicio, descripcion, costo } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombreTipoServicio)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Int, parseInt(costo))
            .execute('SP_ModificarTipoServicio');
        res.json({ message: 'Servicio actualizado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .execute('SP_EliminarTipoServicio');
        res.json({ message: 'Servicio eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getServicios, createServicio, updateServicio, deleteServicio };