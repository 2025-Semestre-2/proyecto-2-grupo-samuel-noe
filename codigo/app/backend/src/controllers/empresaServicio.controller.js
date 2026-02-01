const { getConnection, sql } = require('../config/db');

const getEmpresas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT IdEmpresaRecreacion, NombreComercial FROM EmpresaRecreacion ORDER BY NombreComercial");
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getServicios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT IdTipoServicio, NombreTipoServicio FROM TipoServicio ORDER BY NombreTipoServicio");
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getRelaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarEmpresaServicio');
        res.json(result.recordset);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const createRelacion = async (req, res) => {
    const { idEmpresa, idServicio } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdEmpresa', sql.Int, parseInt(idEmpresa))
            .input('IdServicio', sql.Int, parseInt(idServicio))
            .execute('SP_RegistrarEmpresaServicio');
        res.json({ message: 'Servicio asignado correctamente.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const updateRelacion = async (req, res) => {
    const { id } = req.params;
    const { idEmpresa, idServicio } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRelacion', sql.Int, parseInt(id))
            .input('IdEmpresa', sql.Int, parseInt(idEmpresa))
            .input('IdServicio', sql.Int, parseInt(idServicio))
            .execute('SP_ModificarEmpresaServicio');
        res.json({ message: 'Asignación actualizada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteRelacion = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRelacion', sql.Int, parseInt(id))
            .execute('SP_EliminarEmpresaServicio');
        res.json({ message: 'Asignación eliminada.' });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { 
    getEmpresas, getServicios, 
    getRelaciones, createRelacion, updateRelacion, deleteRelacion 
};