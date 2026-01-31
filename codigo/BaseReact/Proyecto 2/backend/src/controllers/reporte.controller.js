const { getConnection, sql } = require('../config/db');

const getOcupacion = async (req, res) => {
    const { fechaInicio, fechaFin, tipoHabitacion } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('FechaInicio', sql.DateTime, new Date(fechaInicio))
            .input('FechaFin', sql.Date, new Date(fechaFin))
            .input('NombreTipoHabitacion', sql.NVarChar, tipoHabitacion || null)
            .execute('SP_ReporteOcupacion');
        
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRangoEdades = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReporteRangoEdades');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFacturacion = async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('FechaInicio', sql.Date, new Date(fechaInicio))
            .input('FechaFin', sql.Date, new Date(fechaFin))
            .query(`
                SELECT * FROM Factura 
                WHERE FechaEmision BETWEEN @FechaInicio AND @FechaFin
            `);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getOcupacion, getRangoEdades, getFacturacion };