const { getConnection, sql } = require('../config/db');

const getEmpresas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarEmpresaRecreacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEmpresa = async (req, res) => {
    const { 
        nombreComercial, cedulaJuridica, correoElectronico, 
        nombreContacto, provincia, canton, distrito, senasExactas 
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('NombreComercial', sql.NVarChar, nombreComercial)
            .input('CedulaJuridica', sql.Int, parseInt(cedulaJuridica))
            .input('CorreoElectronico', sql.NVarChar, correoElectronico)
            .input('NombreContacto', sql.NVarChar, nombreContacto)
            .input('Provincia', sql.NVarChar, provincia)
            .input('Canton', sql.NVarChar, canton)
            .input('Distrito', sql.NVarChar, distrito)
            .input('SenasExactas', sql.NVarChar, senasExactas)
            .execute('SP_RegistrarEmpresaRecreacion');
        res.json({ message: 'Empresa registrada correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateEmpresa = async (req, res) => {
    const { id } = req.params;
    const { 
        nombreComercial, cedulaJuridica, correoElectronico, 
        nombreContacto, provincia, canton, distrito, senasExactas 
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdEmpresaRecreacion', sql.Int, parseInt(id))
            .input('NombreComercial', sql.NVarChar, nombreComercial)
            .input('CedulaJuridica', sql.Int, parseInt(cedulaJuridica))
            .input('CorreoElectronico', sql.NVarChar, correoElectronico)
            .input('NombreContacto', sql.NVarChar, nombreContacto)
            .input('Provincia', sql.NVarChar, provincia)
            .input('Canton', sql.NVarChar, canton)
            .input('Distrito', sql.NVarChar, distrito)
            .input('SenasExactas', sql.NVarChar, senasExactas)
            .execute('SP_ModificarEmpresaRecreacion');
        res.json({ message: 'Empresa actualizada correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteEmpresa = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdEmpresaRecreacion', sql.Int, parseInt(id))
            .execute('SP_EliminarEmpresaRecreacion');
        res.json({ message: 'Empresa eliminada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa };