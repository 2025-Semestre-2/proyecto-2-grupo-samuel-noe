const { getConnection, sql } = require('../config/db');

const getEmpresas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT IdEmpresaRecreacion, NombreComercial FROM EmpresaRecreacion ORDER BY NombreComercial");
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getActividades = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT IdTipoActividad, NombreTipoActividad FROM TipoActividad ORDER BY NombreTipoActividad");
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// CRUD Principal
const getRelaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarEmpresaActividad');
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const createRelacion = async (req, res) => {
    const { idEmpresa, idActividad } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdEmpresa', sql.Int, parseInt(idEmpresa))
            .input('IdActividad', sql.Int, parseInt(idActividad))
            .execute('SP_RegistrarEmpresaActividad');
        res.json({ message: 'Asignación creada correctamente.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const updateRelacion = async (req, res) => {
    const { id } = req.params;
    const { idEmpresa, idActividad } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRelacion', sql.Int, parseInt(id))
            .input('IdEmpresa', sql.Int, parseInt(idEmpresa))
            .input('IdActividad', sql.Int, parseInt(idActividad))
            .execute('SP_ModificarEmpresaActividad');
        res.json({ message: 'Asignación actualizada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteRelacion = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRelacion', sql.Int, parseInt(id))
            .execute('SP_EliminarEmpresaActividad');
        res.json({ message: 'Asignación eliminada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { 
    getEmpresas, getActividades, 
    getRelaciones, createRelacion, updateRelacion, deleteRelacion 
};