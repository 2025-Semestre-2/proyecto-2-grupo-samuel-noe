const { getConnection, sql } = require('../config/db');

const getCodigosPais = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT IdCodigoTelefono, Pais FROM CodigoTelefono');
        res.json(result.recordset);
    } catch (error) {
        console.error("ERROR SQL (getCodigosPais):", error.message); 
        res.status(500).json({ 
            error: "Error de Base de Datos", 
            detalle: error.message
        });
    }
};

module.exports = { getCodigosPais };