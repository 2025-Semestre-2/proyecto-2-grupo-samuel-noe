const { getConnection, sql } = require('../config/db');

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Cliente');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registrar cliente
const createCliente = async (req, res) => {
    const { 
        nombre, apellido1, apellido2, fechaNacimiento, 
        tipoIdentificacion, numeroIdentificacion, 
        paisResidencia, provincia, canton, distrito, correoElectronico 
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('Apellido1', sql.NVarChar, apellido1)
            .input('Apellido2', sql.NVarChar, apellido2)
            .input('FechaNacimiento', sql.Date, fechaNacimiento)
            .input('TipoIdentificacion', sql.NVarChar, tipoIdentificacion)
            .input('NumeroIdentificacion', sql.Int, parseInt(numeroIdentificacion))
            .input('PaisResidencia', sql.NVarChar, paisResidencia)
            .input('Provincia', sql.NVarChar, provincia)
            .input('Canton', sql.NVarChar, canton)
            .input('Distrito', sql.NVarChar, distrito)
            .input('CorreoElectronico', sql.NVarChar, correoElectronico)
            .execute('SP_RegistrarCliente');

        res.json({ message: 'Cliente registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getClientes, createCliente };