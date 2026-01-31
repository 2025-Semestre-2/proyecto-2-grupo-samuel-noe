const { getConnection, sql } = require('../config/db');

const getEmpresas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM EmpresaRecreacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEmpresa = async (req, res) => {
    const { 
        nombreComercial, cedulaJuridica, correoElectronico, telefono, 
        nombreContacto, provincia, canton, distrito, senasExactas 
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('NombreComercial', sql.NVarChar, nombreComercial)
            .input('CedulaJuridica', sql.Int, parseInt(cedulaJuridica))
            .input('CorreoElectronico', sql.NVarChar, correoElectronico)
            .input('Telefono', sql.Int, parseInt(telefono))
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
    const { nombreComercial, correoElectronico, telefono } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdEmpresa', sql.Int, parseInt(id))
            .input('NombreComercial', sql.NVarChar, nombreComercial)
            .input('Correo', sql.NVarChar, correoElectronico)
            .input('Telefono', sql.Int, parseInt(telefono))
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
            .input('IdEmpresa', sql.Int, parseInt(id))
            .execute('SP_EliminarEmpresaRecreacion');

        res.json({ message: 'Empresa eliminada correctamente.' });
    } catch (error) {
        res.status(409).json({ error: 'No se puede eliminar. Verifique dependencias.' });
    }
};

const getActividades = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Actividad');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createActividad = async (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Decimal(10,2), parseFloat(costo))
            .execute('SP_RegistrarActividad');

        res.json({ message: 'Actividad registrada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateActividad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, costo } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdActividad', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombre)
            .input('Descripcion', sql.NVarChar, descripcion)
            .input('Costo', sql.Decimal(10,2), parseFloat(costo))
            .execute('SP_ModificarActividad');

        res.json({ message: 'Actividad actualizada.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteActividad = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdActividad', sql.Int, parseInt(id))
            .execute('SP_EliminarActividad');

        res.json({ message: 'Actividad eliminada.' });
    } catch (error) {
        res.status(409).json({ error: 'No se puede eliminar la actividad.' });
    }
};

module.exports = {
    getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa,
    getActividades, createActividad, updateActividad, deleteActividad
};