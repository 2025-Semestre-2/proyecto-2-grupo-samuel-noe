const { getConnection, sql } = require('../config/db');

// Listar
const getHoteles = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM V_ListadoHoteles');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear
const createHotel = async (req, res) => {
    const {
        nombreComercial, cedulaJuridica, tipoHospedaje, provincia, canton, distrito,
        barrio, senasExactas, referenciaGPS, telefono1, correoElectronico, sitioWebURL
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('NombreComercial', sql.NVarChar, nombreComercial)
            .input('CedulaJuridica', sql.Int, parseInt(cedulaJuridica))
            .input('TipoHospedaje', sql.NVarChar, tipoHospedaje)
            .input('Provincia', sql.NVarChar, provincia)
            .input('Canton', sql.NVarChar, canton)
            .input('Distrito', sql.NVarChar, distrito)
            .input('Barrio', sql.NVarChar, barrio || null)
            .input('SenasExactas', sql.NVarChar, senasExactas)
            .input('ReferenciaGPS', sql.NVarChar, referenciaGPS || null)
            .input('CorreoElectronico', sql.NVarChar, correoElectronico)
            .input('SitioWebURL', sql.NVarChar, sitioWebURL || null)
            .input('Telefono1', sql.Int, parseInt(telefono1))
            .input('Telefono2', sql.Int, null)
            .execute('SP_RegistrarHospedaje');

        res.json({ message: 'Hotel registrado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Modificar
const updateHotel = async (req, res) => {
    const { id } = req.params; // Se asume que ID es la Cédula Jurídica o ID único
    const { nombreComercial, telefono1, correoElectronico, sitioWebURL } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(id))
            .input('NombreComercial', sql.NVarChar, nombreComercial)
            .input('Telefono1', sql.Int, parseInt(telefono1))
            .input('CorreoElectronico', sql.NVarChar, correoElectronico)
            .input('SitioWebURL', sql.NVarChar, sitioWebURL)
            .execute('SP_ModificarHospedaje');

        res.json({ message: 'Hotel actualizado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar
const deleteHotel = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('CedulaJuridica', sql.Int, parseInt(id))
            .execute('SP_EliminarHospedaje');

        res.json({ message: 'Hotel eliminado correctamente.' });
    } catch (error) {
        res.status(409).json({ error: 'No se puede eliminar el hotel. Verifique reservaciones asociadas.' });
    }
};

module.exports = { getHoteles, createHotel, updateHotel, deleteHotel };