const { getConnection, sql } = require('../config/db');

const getCodigos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ListarCodigosTelefono');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClientes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarClientes');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTelefonos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarTelefonoCliente');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTelefono = async (req, res) => {
    const { idCliente, numeroTelefono, codigoPais } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdCliente', sql.Int, parseInt(idCliente))
            .input('NumeroTelefono', sql.Int, parseInt(numeroTelefono))
            .input('CodigoPais', sql.Int, parseInt(codigoPais))
            .execute('SP_RegistrarTelefonoCliente');
        res.json({ message: 'Teléfono agregado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTelefono = async (req, res) => {
    const { id } = req.params;
    const { numeroTelefono, codigoPais } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdTelefonoCliente', sql.Int, parseInt(id))
            .input('NumeroTelefono', sql.Int, parseInt(numeroTelefono))
            .input('CodigoPais', sql.Int, parseInt(codigoPais))
            .execute('SP_ModificarTelefonoCliente');
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
            .input('IdTelefonoCliente', sql.Int, parseInt(id))
            .execute('SP_EliminarTelefonoCliente');
        res.json({ message: 'Teléfono eliminado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { 
    getCodigos,
    getClientes, 
    getTelefonos, 
    createTelefono, 
    updateTelefono, 
    deleteTelefono 
};