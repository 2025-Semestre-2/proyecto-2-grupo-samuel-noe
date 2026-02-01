const { getConnection, sql } = require('../config/db');

const getClientes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('SP_ReportarClientes');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCliente = async (req, res) => {
    const { 
        nombre, primerApellido, segundoApellido, fechaNacimiento, 
        tipoIdentificacion, numeroIdentificacion, paisResidencia, 
        provincia, canton, distrito, correo 
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('PrimerApellido', sql.NVarChar, primerApellido)
            .input('SegundoApellido', sql.NVarChar, segundoApellido)
            .input('FechaNacimiento', sql.Date, fechaNacimiento)
            .input('TipoIdentificacion', sql.NVarChar, tipoIdentificacion)
            .input('NumeroIdentificacion', sql.NVarChar, numeroIdentificacion)
            .input('PaisResidencia', sql.NVarChar, paisResidencia)
            .input('Provincia', sql.NVarChar, provincia)
            .input('Canton', sql.NVarChar, canton)
            .input('Distrito', sql.NVarChar, distrito)
            .input('Correo', sql.NVarChar, correo)
            .execute('SP_RegistrarCliente');
        
        res.json({ message: 'Cliente registrado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { 
        nombre, primerApellido, segundoApellido, fechaNacimiento, 
        tipoIdentificacion, numeroIdentificacion, paisResidencia, 
        provincia, canton, distrito, correo 
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdCliente', sql.Int, parseInt(id))
            .input('Nombre', sql.NVarChar, nombre)
            .input('PrimerApellido', sql.NVarChar, primerApellido)
            .input('SegundoApellido', sql.NVarChar, segundoApellido)
            .input('FechaNacimiento', sql.Date, fechaNacimiento)
            .input('TipoIdentificacion', sql.NVarChar, tipoIdentificacion)
            .input('NumeroIdentificacion', sql.NVarChar, numeroIdentificacion)
            .input('PaisResidencia', sql.NVarChar, paisResidencia)
            .input('Provincia', sql.NVarChar, provincia)
            .input('Canton', sql.NVarChar, canton)
            .input('Distrito', sql.NVarChar, distrito)
            .input('Correo', sql.NVarChar, correo)
            .execute('SP_ModificarCliente');
        
        res.json({ message: 'Cliente actualizado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdCliente', sql.Int, parseInt(id))
            .execute('SP_EliminarCliente');
        res.json({ message: 'Cliente eliminado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getClientes, createCliente, updateCliente, deleteCliente };