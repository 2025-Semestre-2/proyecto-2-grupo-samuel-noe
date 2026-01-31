const { getConnection, sql } = require('../config/db');

const getTipos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTipoHabitacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTipo = async (req, res) => {
    const { idHospedaje, nombre, descripcion, tipoCama, precio } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(idHospedaje))
            .input('Nombre', sql.NVarChar, nombre)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('TipoCama', sql.NVarChar, tipoCama)
            .input('Precio', sql.Decimal(10, 2), parseFloat(precio))
            .execute('SP_RegistrarTipoHabitacion');
        res.json({ message: 'Tipo de habitación registrado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTipo = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, tipoCama, precio } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTipoHabitacion', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombre)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('TipoCama', sql.NVarChar, tipoCama)
            .input('Precio', sql.Decimal(10, 2), parseFloat(precio))
            .execute('SP_ModificarTipoHabitacion');
        res.json({ message: 'Tipo actualizado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTipo = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTipoHabitacion', sql.Int, parseInt(id))
            .execute('SP_EliminarTipoHabitacion');
        res.json({ message: 'Tipo eliminado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTipos, createTipo, updateTipo, deleteTipo };