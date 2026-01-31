const { getConnection, sql } = require('../config/db');

const getCatalogoRedes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ListarCatalogoRedes');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRedesHotel = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarRedesSocialesHotel');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRedHotel = async (req, res) => {
    const { idHospedaje, idPlataforma } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(idHospedaje))
            .input('IdPlataforma', sql.Int, parseInt(idPlataforma))
            .execute('SP_RegistrarRedSocialHotel');
        res.json({ message: 'Red social asociada correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateRedHotel = async (req, res) => {
    const { id } = req.params;
    const { idPlataforma } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRedSocial', sql.Int, parseInt(id))
            .input('IdPlataforma', sql.Int, parseInt(idPlataforma))
            .execute('SP_ModificarRedSocialHotel');
        res.json({ message: 'Asociación actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRedHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRedSocial', sql.Int, parseInt(id))
            .execute('SP_EliminarRedSocialHotel');
        res.json({ message: 'Red social desvinculada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCatalogoRedes, getRedesHotel, createRedHotel, updateRedHotel, deleteRedHotel };