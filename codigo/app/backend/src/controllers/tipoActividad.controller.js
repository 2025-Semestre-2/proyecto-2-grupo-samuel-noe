const { getConnection, sql } = require('../config/db');

const getTiposActividad = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTipoActividad');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTipoActividad = async (req, res) => {
    const { nombreTipoActividad, descripcion, costo } = req.body;
    
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombreTipoActividad)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Int, parseInt(costo))
            .execute('SP_RegistrarTipoActividad');
        res.json({ message: 'Tipo de actividad registrado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTipoActividad = async (req, res) => {
    const { id } = req.params;
    const { nombreTipoActividad, descripcion, costo } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombreTipoActividad)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Int, parseInt(costo))
            .execute('SP_ModificarTipoActividad');
        res.json({ message: 'Tipo de actividad actualizado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTipoActividad = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .execute('SP_EliminarTipoActividad');
        res.json({ message: 'Tipo de actividad eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { 
    getTiposActividad, 
    createTipoActividad, 
    updateTipoActividad, 
    deleteTipoActividad 
};