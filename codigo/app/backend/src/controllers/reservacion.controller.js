const { getConnection, sql } = require('../config/db');

const getListas = async (req, res) => {
    try {
        const pool = await getConnection();
        const clientes = await pool.request().query("SELECT IdCliente, Nombre + ' ' + PrimerApellido AS NombreCompleto FROM Cliente");
        const habitaciones = await pool.request().query("SELECT IdHabitacion, Numero, Estado FROM Habitacion");
        res.json({ clientes: clientes.recordset, habitaciones: habitaciones.recordset });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getReservaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarReservaciones');
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const createReservacion = async (req, res) => {
    const { idCliente, idHabitacion, fechaIngreso, fechaSalida, cantPersonas, poseeVehiculo } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdCliente', sql.Int, idCliente)
            .input('IdHabitacion', sql.Int, idHabitacion)
            .input('FechaIngreso', sql.DateTime, fechaIngreso)
            .input('FechaSalida', sql.Date, fechaSalida)
            .input('CantPersonas', sql.Int, cantPersonas)
            .input('PoseeVehiculo', sql.Bit, poseeVehiculo)
            .execute('SP_RegistrarReservacion');
        res.json({ message: 'Reservación creada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const updateReservacion = async (req, res) => {
    const { id } = req.params;
    const { idCliente, idHabitacion, fechaIngreso, fechaSalida, cantPersonas, poseeVehiculo, estado } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdReservacion', sql.Int, id)
            .input('IdCliente', sql.Int, idCliente)
            .input('IdHabitacion', sql.Int, idHabitacion)
            .input('FechaIngreso', sql.DateTime, fechaIngreso)
            .input('FechaSalida', sql.Date, fechaSalida)
            .input('CantPersonas', sql.Int, cantPersonas)
            .input('PoseeVehiculo', sql.Bit, poseeVehiculo)
            .input('Estado', sql.NVarChar, estado) // Si es 'Cerrado', activa Trigger
            .execute('SP_ModificarReservacion');
        res.json({ message: 'Reservación actualizada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteReservacion = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdReservacion', sql.Int, id)
            .execute('SP_EliminarReservacion');
        res.json({ message: 'Reservación eliminada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { getListas, getReservaciones, createReservacion, updateReservacion, deleteReservacion };