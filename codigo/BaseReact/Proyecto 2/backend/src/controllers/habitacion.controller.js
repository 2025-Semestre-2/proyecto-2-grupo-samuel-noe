const { getConnection, sql } = require('../config/db');

const getHabitaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Habitacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createHabitacion = async (req, res) => {
    const { idHospedaje, idTipoHabitacion, numero, estado } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(idHospedaje))
            .input('IdTipoHabitacion', sql.Int, parseInt(idTipoHabitacion))
            .input('Numero', sql.Int, parseInt(numero))
            .input('Estado', sql.NVarChar, estado)
            .execute('SP_RegistrarHabitacion');

        res.json({ message: 'Habitación registrada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getHabitaciones, createHabitacion };