const { getConnection, sql } = require('../config/db');

const getCatalogo = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarCatalogoRedSocial');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRed = async (req, res) => {
    const { nombre, url } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('Url', sql.NVarChar, url)
            .execute('SP_RegistrarCatalogoRedSocial');
        res.json({ message: 'Plataforma creada exitosamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateRed = async (req, res) => {
    const { id } = req.params;
    const { nombre, url } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombre)
            .input('Url', sql.NVarChar, url)
            .execute('SP_ModificarCatalogoRedSocial');
        res.json({ message: 'Plataforma actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRed = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .execute('SP_EliminarCatalogoRedSocial');
        res.json({ message: 'Plataforma eliminada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCatalogo, createRed, updateRed, deleteRed };