const { getConnection, sql } = require('../config/db');

const getServicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarCatalogoServicio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createServicio = async (req, res) => {
    const { nombre } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .execute('SP_RegistrarCatalogoServicio');
        res.json({ message: 'Servicio creado exitosamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombre)
            .execute('SP_ModificarCatalogoServicio');
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
            .execute('SP_EliminarCatalogoServicio');
        res.json({ message: 'Servicio eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getServicios, createServicio, updateServicio, deleteServicio };