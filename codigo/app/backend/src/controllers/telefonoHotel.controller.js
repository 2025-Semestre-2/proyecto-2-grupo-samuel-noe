const { getConnection, sql } = require('../config/db');

const getTelefonos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTelefonosHotel');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTelefono = async (req, res) => {
    const { idHospedaje, codigoPais, numeroTelefono } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(idHospedaje))
            .input('CodigoPais', sql.Int, parseInt(codigoPais))
            .input('NumeroTelefono', sql.Int, parseInt(numeroTelefono))
            .execute('SP_RegistrarTelefonoIndividual');
        
        res.json({ message: 'Teléfono agregado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTelefono = async (req, res) => {
    const { id } = req.params;
    const { codigoPais, numeroTelefono } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTelefono', sql.Int, parseInt(id))
            .input('CodigoPais', sql.Int, parseInt(codigoPais))
            .input('NumeroTelefono', sql.Int, parseInt(numeroTelefono))
            .execute('SP_ModificarTelefonoIndividual');
        
        res.json({ message: 'Teléfono actualizado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTelefono = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTelefono', sql.Int, parseInt(id))
            .execute('SP_EliminarTelefonoIndividual');
        
        res.json({ message: 'Teléfono eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTelefonos, createTelefono, updateTelefono, deleteTelefono };