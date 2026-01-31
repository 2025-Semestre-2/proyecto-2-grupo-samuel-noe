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

// Obtener UN hotel por ID
const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        
        // 1. Datos del Hotel
        const hotelResult = await pool.request()
            .input('Id', sql.Int, id)
            .query('SELECT * FROM Hospedaje WHERE CedulaJuridica = @Id');

        if (hotelResult.recordset.length === 0) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }

        // 2. Datos de los Teléfonos
        const phonesResult = await pool.request()
            .input('Id', sql.Int, id)
            .query('SELECT * FROM HospedajeTelefono WHERE IdHospedaje = @Id');

        // Combinar respuesta
        const hotel = hotelResult.recordset[0];
        const telefonos = phonesResult.recordset;

        res.json({ ...hotel, telefonos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear
const createHotel = async (req, res) => {
    const {
        nombreComercial, cedulaJuridica, tipoHospedaje, provincia, canton, distrito,
        barrio, senasExactas, referenciaGPS, correoElectronico, sitioWebURL,
        telefono1, codigoPais1, telefono2, codigoPais2
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
            .input('CodigoPais1', sql.Int, parseInt(codigoPais1))
            .input('Telefono2', sql.Int, telefono2 ? parseInt(telefono2) : null)
            .input('CodigoPais2', sql.Int, codigoPais2 ? parseInt(codigoPais2) : null)
            .execute('SP_RegistrarHospedaje');

        res.json({ message: 'Hotel registrado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar
const updateHotel = async (req, res) => {
    const { id } = req.params;
    const {
        nombreComercial, tipoHospedaje, provincia, canton, distrito,
        barrio, senasExactas, referenciaGPS, correoElectronico, sitioWebURL,
        telefono1, codigoPais1, telefono2, codigoPais2
    } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdHospedaje', sql.Int, parseInt(id))
            .input('NombreComercial', sql.NVarChar, nombreComercial)
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
            .input('CodigoPais1', sql.Int, parseInt(codigoPais1))
            .input('Telefono2', sql.Int, telefono2 ? parseInt(telefono2) : null)
            .input('CodigoPais2', sql.Int, codigoPais2 ? parseInt(codigoPais2) : null)
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
        res.status(409).json({ error: 'No se puede eliminar. Verifique dependencias.' });
    }
};

// Buscar Hoteles por Criterio
const searchHoteles = async (req, res) => {
    const { criterio } = req.query;

    if (!criterio) {
        return res.status(400).json({ message: "El criterio de búsqueda es requerido." });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Criterio', sql.NVarChar, criterio)
            .execute('SP_BuscarHoteles');

        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getHoteles, getHotelById, createHotel, updateHotel, deleteHotel, searchHoteles };