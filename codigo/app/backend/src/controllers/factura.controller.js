const { getConnection, sql } = require('../config/db');

const getFacturas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarFacturas');
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const createFactura = async (req, res) => {
    const { idReservacion, fechaEmision, metodoPago, numeroNoches, importeTotal } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdReservacion', sql.Int, parseInt(idReservacion))
            .input('FechaEmision', sql.DateTime, fechaEmision)
            .input('MetodoPago', sql.NVarChar, metodoPago || null)
            .input('NumeroNoches', sql.Int, parseInt(numeroNoches))
            .input('ImporteTotal', sql.Decimal(18, 2), parseFloat(importeTotal))
            .execute('SP_RegistrarFacturaManual');
        res.json({ message: 'Factura registrada manualmente.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const updateFactura = async (req, res) => {
    const { id } = req.params;
    const { fechaEmision, metodoPago, numeroNoches, importeTotal } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdFactura', sql.Int, parseInt(id))
            .input('FechaEmision', sql.DateTime, fechaEmision)
            .input('MetodoPago', sql.NVarChar, metodoPago)
            .input('NumeroNoches', sql.Int, parseInt(numeroNoches))
            .input('ImporteTotal', sql.Decimal(18, 2), parseFloat(importeTotal))
            .execute('SP_ModificarFactura');
        res.json({ message: 'Factura actualizada (Pago registrado).' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteFactura = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdFactura', sql.Int, parseInt(id))
            .execute('SP_EliminarFactura');
        res.json({ message: 'Factura eliminada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { getFacturas, createFactura, updateFactura, deleteFactura };