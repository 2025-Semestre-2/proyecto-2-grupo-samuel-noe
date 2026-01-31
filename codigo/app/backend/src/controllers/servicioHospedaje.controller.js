const { getConnection, sql } = require('../config/db');

const getCatalogoServicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarCatalogoServicio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getServiciosHotel = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarHospedajeServicio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createServicioHotel = async (req, res) => {
    const { idHospedaje, idServicio } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(idHospedaje))
            .input('IdServicio', sql.Int, parseInt(idServicio))
            .execute('SP_RegistrarHospedajeServicio');
        res.json({ message: 'Servicio asociado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateServicioHotel = async (req, res) => {
    const { id } = req.params;
    const { idServicio } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .input('IdServicio', sql.Int, parseInt(idServicio))
            .execute('SP_ModificarHospedajeServicio');
        res.json({ message: 'Asociación actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteServicioHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id', sql.Int, parseInt(id))
            .execute('SP_EliminarHospedajeServicio');
        res.json({ message: 'Servicio desvinculado.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCatalogoServicios, getServiciosHotel, createServicioHotel, updateServicioHotel, deleteServicioHotel };