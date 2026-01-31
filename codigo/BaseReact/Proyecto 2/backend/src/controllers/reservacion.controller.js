const { getConnection, sql } = require('../config/db');

// POST: Crear Reserva
const crearReserva = async (req, res) => {
    const { idCliente, idHabitacion, fechaIngreso, fechaSalida, cantidadPersonas, poseeVehiculo } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('IdCliente', sql.Int, idCliente)
            .input('IdHabitacion', sql.Int, idHabitacion)
            .input('FechaIngreso', sql.DateTime, new Date(fechaIngreso))
            .input('FechaSalida', sql.Date, new Date(fechaSalida))
            .input('CantidadPersonas', sql.Int, cantidadPersonas)
            .input('PoseeVehiculo', sql.Bit, poseeVehiculo ? 1 : 0)
            .output('IdReservacion', sql.Int)
            .execute('SP_CrearReservacion');

        res.json({ 
            message: 'Reserva creada con éxito', 
            idReservacion: result.output.IdReservacion 
        });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// PUT: Checkout
const realizarCheckout = async (req, res) => {
    const { idReservacion } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdReservacion', sql.Int, idReservacion)
            .execute('SP_RealizarCheckOut');
        
        res.json({ message: 'Checkout realizado. Factura generada automáticamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET: Obtener Facturas
const getFacturas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Factura');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearReserva, realizarCheckout, getFacturas };