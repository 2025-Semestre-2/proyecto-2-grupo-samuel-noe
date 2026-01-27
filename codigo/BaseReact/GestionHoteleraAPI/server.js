//Para correr el servidor: node server.js

import express from 'express';
import cors from 'cors';
import sql from 'mssql/msnodesqlv8.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Configuracion para que la conexion con sql sea mediante windows
const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=L-SammyGC\\MSSQLSERVER01;Database=GestionHoteleraDB;Trusted_Connection=yes;'
};


let pool;

//Funcion que conecta con la base de datos
async function connectDB() {
  try {
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('✅ Conectado a SQL Server');
    } 
    catch (error) 
    {
    console.error('❌ Error conectando a SQL Server:');
    console.error('Mensaje:', error.message);
    console.error('Code:', error.code);
    console.error('Stack:', error.stack);
    process.exit(1);
    }
}

//APIs de Hospedaje =====================================================
/*
//API para obtener los datos de hospedaje 
app.get('/api/hospedaje', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM Hospedaje');
        
        res.json({
        success: true,
        data: result.recordset,
        count: result.recordset.length
        });
    } 

    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

//API para insertar los datos de hospedaje
app.post('/api/hospedaje', async (req, res) => {
  try {
    const { NombreComercial, CedulaJuridica , TipoHospedaje, Provincia, Canton, Distrito, Barrio, SenasExactas, ReferenciaGPS, CorreoElectronico, SitioWebURL} = req.body;
    if (!NombreComercial || !CedulaJuridica || !TipoHospedaje || !Provincia || !Canton || !Distrito || !Barrio || !SenasExactas || !ReferenciaGPS || !CorreoElectronico || !SitioWebURL) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('NombreComercial', sql.NVarChar, NombreComercial)
      .input('CedulaJuridica', sql.Int, CedulaJuridica) 
      .input('TipoHospedaje', sql.NVarChar, TipoHospedaje)
      .input('Provincia', sql.NVarChar, Provincia)
      .input('Canton', sql.NVarChar, Canton)
      .input('Distrito', sql.NVarChar, Distrito)
      .input('Barrio', sql.NVarChar, Barrio)
      .input('SenasExactas', sql.NVarChar, SenasExactas)
      .input('ReferenciaGPS', sql.NVarChar, ReferenciaGPS)
      .input('CorreoElectronico', sql.NVarChar, CorreoElectronico)
      .input('SitioWebURL', sql.NVarChar, SitioWebURL)
      .query(`
        INSERT INTO Hospedaje (NombreComercial, CedulaJuridica, TipoHospedaje, Provincia, Canton, Distrito, Barrio, SenasExactas, ReferenciaGPS, CorreoElectronico, SitioWebURL)
        VALUES (@NombreComercial, @CedulaJuridica, @TipoHospedaje, @Provincia, @Canton, @Distrito, @Barrio, @SenasExactas, @ReferenciaGPS, @CorreoElectronico, @SitioWebURL)`);

      res.json({ success: true, message: 'Insertado' });
    } 
    catch (error) {
      console.error('Error al insertar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al insertar', error: error.message });
    }
});

//API para modificar los datos de hospedaje 
app.put('/api/hospedaje/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { NombreComercial, CedulaJuridica , TipoHospedaje, Provincia, Canton, Distrito, Barrio, SenasExactas, ReferenciaGPS, CorreoElectronico, SitioWebURL} = req.body;
    if (!NombreComercial || !CedulaJuridica || !TipoHospedaje || !Provincia || !Canton || !Distrito || !Barrio || !SenasExactas || !ReferenciaGPS || !CorreoElectronico || !SitioWebURL) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdHospedaje', sql.Int, id)
      .input('NombreComercial', sql.NVarChar, NombreComercial)
      .input('CedulaJuridica', sql.Int, CedulaJuridica)
      .input('TipoHospedaje', sql.NVarChar, TipoHospedaje)
      .input('Provincia', sql.NVarChar, Provincia)
      .input('Canton', sql.NVarChar, Canton)
      .input('Distrito', sql.NVarChar, Distrito)
      .input('Barrio', sql.NVarChar, Barrio)
      .input('SenasExactas', sql.NVarChar, SenasExactas)
      .input('ReferenciaGPS', sql.NVarChar, ReferenciaGPS)
      .input('CorreoElectronico', sql.NVarChar, CorreoElectronico)
      .input('SitioWebURL', sql.NVarChar, SitioWebURL)
      .query(`
        UPDATE Hospedaje SET NombreComercial = @NombreComercial, CedulaJuridica = @CedulaJuridica, TipoHospedaje = @TipoHospedaje, Provincia = @Provincia, Canton = @Canton, Distrito = @Distrito, Barrio = @Barrio, SenasExactas = @SenasExactas, ReferenciaGPS = @ReferenciaGPS, CorreoElectronico = @CorreoElectronico, SitioWebURL = @SitioWebURL
        WHERE IdHospedaje = @IdHospedaje`);
    res.json({ success: true, message: 'Modificado' });
    } 
    catch (error) {
      console.error('Error al modificar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al modificar', error: error.message });
    }
});

//API para eliminar los datos de hospedaje 
app.delete('/api/hospedaje/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdHospedaje', sql.Int, id)
      .query(`DELETE FROM Hospedaje WHERE IdHospedaje = @IdHospedaje`);
    res.json({ success: true, message: 'Eliminado' });
    } 
    catch (error) {
      console.error('Error al eliminar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al eliminar', error: error.message });
    }
});

//API para obtener las tuplas de hospedaje mediante su id
app.get('/api/hospedaje/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const request = pool.request();
        
        const result = await request
        .input('id', sql.Int, id)
        .query('SELECT * FROM Hospedaje WHERE IdHospedaje = @id');
        
        if (result.recordset.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Registro no encontrado'
        });
        }
        
        res.json({
        success: true,
        data: result.recordset[0]
        });
    } 
    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});
*/
//APIs de Cliente =====================================================

//API para obtener los datos de cliente 
app.get('/api/cliente', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM Cliente');
        
        res.json({
        success: true,
        data: result.recordset,
        count: result.recordset.length
        });
    } 

    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

//API para insertar los datos de cliente
app.post('/api/cliente', async (req, res) => {
  try {
    const { Nombre, PrimerApellido , SegundoApellido, FechaNacimiento, TipoIdentificacion, NumeroIdentificacion, PaisResidencia, Provincia, Canton, Distrito, CorreoElectronico} = req.body;
    if (!Nombre || !PrimerApellido || !SegundoApellido || !FechaNacimiento || !TipoIdentificacion || !NumeroIdentificacion || !PaisResidencia || !Provincia || !Canton || !Distrito || !CorreoElectronico) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('Nombre', sql.NVarChar, Nombre)
      .input('PrimerApellido', sql.NVarChar, PrimerApellido)
      .input('SegundoApellido', sql.NVarChar, SegundoApellido)
      .input('FechaNacimiento', sql.Date, FechaNacimiento)
      .input('TipoIdentificacion', sql.NVarChar, TipoIdentificacion)
      .input('NumeroIdentificacion', sql.NVarChar, NumeroIdentificacion)
      .input('PaisResidencia', sql.NVarChar, PaisResidencia)
      .input('Provincia', sql.NVarChar, Provincia)
      .input('Canton', sql.NVarChar, Canton)
      .input('Distrito', sql.NVarChar, Distrito)
      .input('CorreoElectronico', sql.NVarChar, CorreoElectronico)
      .query(`
        INSERT INTO Cliente (Nombre, PrimerApellido, SegundoApellido, FechaNacimiento, TipoIdentificacion, NumeroIdentificacion, PaisResidencia, Provincia, Canton, Distrito, CorreoElectronico)
        VALUES (@Nombre, @PrimerApellido, @SegundoApellido, @FechaNacimiento, @TipoIdentificacion, @NumeroIdentificacion, @PaisResidencia, @Provincia, @Canton, @Distrito, @CorreoElectronico)`);

    res.json({ success: true, message: 'Insertado' });
    } 
    catch (error) {
      console.error('Error al insertar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al insertar', error: error.message });
    }
});

//API para modificar los datos de cliente 
app.put('/api/cliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, PrimerApellido , SegundoApellido, FechaNacimiento, TipoIdentificacion, NumeroIdentificacion, PaisResidencia, Provincia, Canton, Distrito, CorreoElectronico} = req.body;
    if (!Nombre || !PrimerApellido || !SegundoApellido || !FechaNacimiento || !TipoIdentificacion || !NumeroIdentificacion || !PaisResidencia || !Provincia || !Canton || !Distrito || !CorreoElectronico) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdCliente', sql.Int, id)
      .input('Nombre', sql.NVarChar, Nombre)
      .input('PrimerApellido', sql.NVarChar, PrimerApellido)
      .input('SegundoApellido', sql.NVarChar, SegundoApellido)
      .input('FechaNacimiento', sql.Date, FechaNacimiento)
      .input('TipoIdentificacion', sql.NVarChar, TipoIdentificacion)
      .input('NumeroIdentificacion', sql.NVarChar, NumeroIdentificacion)
      .input('PaisResidencia', sql.NVarChar, PaisResidencia)
      .input('Provincia', sql.NVarChar, Provincia)
      .input('Canton', sql.NVarChar, Canton)
      .input('Distrito', sql.NVarChar, Distrito)
      .input('CorreoElectronico', sql.NVarChar, CorreoElectronico)
      .query(`
        UPDATE Cliente SET Nombre = @Nombre, PrimerApellido = @PrimerApellido, SegundoApellido = @SegundoApellido, FechaNacimiento = @FechaNacimiento, TipoIdentificacion = @TipoIdentificacion, NumeroIdentificacion = @NumeroIdentificacion, PaisResidencia = @PaisResidencia, Provincia = @Provincia, Canton = @Canton, Distrito = @Distrito, CorreoElectronico = @CorreoElectronico
        WHERE IdCliente = @IdCliente`);
    res.json({ success: true, message: 'Modificado' });
    } 
    catch (error) {
      console.error('Error al modificar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al modificar', error: error.message });
    }
});

//API para obtener las tuplas de cliente mediante su id
app.get('/api/cliente/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const request = pool.request();
        
        const result = await request
        .input('id', sql.Int, id)
        .query('SELECT * FROM Cliente WHERE IdCliente = @id');
        
        if (result.recordset.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Registro no encontrado'
        });
        }
        
        res.json({
        success: true,
        data: result.recordset[0]
        });
    } 
    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

//APIs de Telefono Cliente =====================================================

//API para obtener los datos de telefono cliente 
app.get('/api/cliente-telefono', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM ClienteTelefono');
        
        res.json({
        success: true,
        data: result.recordset,
        count: result.recordset.length
        });
    } 

    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

//API para insertar los datos de telefono cliente
app.post('/api/cliente-telefono', async (req, res) => {
  try {
    const { IdCliente, NumeroTelefono , CodigoPais} = req.body;
    if (!IdCliente || !NumeroTelefono || !CodigoPais) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdCliente', sql.Int, IdCliente)
      .input('NumeroTelefono', sql.NVarChar, NumeroTelefono)
      .input('CodigoPais', sql.NVarChar, CodigoPais)
      .query(`
        INSERT INTO ClienteTelefono (IdCliente, NumeroTelefono, CodigoPais)
        VALUES (@IdCliente, @NumeroTelefono, @CodigoPais)`);

      res.json({ success: true, message: 'Insertado' });
    } 
    catch (error) {
      console.error('Error al insertar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al insertar', error: error.message });
    }
});

//API para modificar los datos de telefono cliente 
app.put('/api/cliente-telefono/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { IdTelefonoCliente, IdCliente, NumeroTelefono , CodigoPais} = req.body;
    if (!IdTelefonoCliente || !IdCliente || !NumeroTelefono || !CodigoPais) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdTelefonoCliente', sql.Int, IdTelefonoCliente)
      .input('IdCliente', sql.Int, IdCliente)
      .input('NumeroTelefono', sql.NVarChar, NumeroTelefono)
      .input('CodigoPais', sql.NVarChar, CodigoPais)
      .query(`
        UPDATE ClienteTelefono SET IdCliente = @IdCliente, NumeroTelefono = @NumeroTelefono, CodigoPais = @CodigoPais
        WHERE IdTelefonoCliente = @IdTelefonoCliente`);
    res.json({ success: true, message: 'Modificado' });
    } 
    catch (error) {
      console.error('Error al modificar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al modificar', error: error.message });
    }
});

//API para eliminar los datos de telefono cliente 
app.delete('/api/cliente-telefono/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdTelefonoCliente', sql.Int, id)
      .query(`DELETE FROM ClienteTelefono WHERE IdTelefonoCliente = @IdTelefonoCliente`);
    res.json({ success: true, message: 'Eliminado' });
    } 
    catch (error) {
      console.error('Error al eliminar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al eliminar', error: error.message });
    }
});

//API para obtener las tuplas de telefono cliente mediante su id
app.get('/api/cliente-telefono/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const request = pool.request();
        
        const result = await request
        .input('id', sql.Int, id)
        .query('SELECT * FROM ClienteTelefono WHERE IdTelefonoCliente = @id');
        
        if (result.recordset.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Registro no encontrado'
        });
        }
        
        res.json({
        success: true,
        data: result.recordset[0]
        });
    } 
    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

//APIs de TelefonoHospedaje =====================================================

//API para obtener los datos de telefono de hotel 
app.get('/api/hospedaje-telefonos', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM HospedajeTelefono');
        
        res.json({
        success: true,
        data: result.recordset,
        count: result.recordset.length
        });
    } 

    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

//API para insertar los datos de telefono de hotel
app.post('/api/hospedaje-telefonos', async (req, res) => {
  try {
    const { IdHospedaje, CodigoPais , NumeroTelefono} = req.body;
    if (!IdHospedaje || !NumeroTelefono || !CodigoPais) {
      return res.status(400).json({ success: false, message: 'Faltan campos por rellenar' });
    }

    const request = pool.request();
    await request
      .input('IdHospedaje', sql.Int, IdHospedaje)
      .input('CodigoPais', sql.Int, CodigoPais)
      .input('NumeroTelefono', sql.Int, NumeroTelefono)
      .query(`
        INSERT INTO HospedajeTelefono (IdHospedaje, CodigoPais, NumeroTelefono)
        VALUES (@IdHospedaje, @CodigoPais, @NumeroTelefono) `);

    res.json({ success: true, message: 'Insertado' });
    } 
    catch (error) {
      console.error('Error al insertar los datos:', error.message);
      res.status(500).json({ success: false, message: 'Error al insertar', error: error.message });
    }
});

//API para obtener las tuplas de telefonos hospedaje mediante su id
app.get('/api/hospedaje-telefonos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const request = pool.request();
        
        const result = await request
        .input('id', sql.Int, id)
        .query('SELECT * FROM HospedajeTelefono WHERE IdHospedajeTelefono = @id');
        
        if (result.recordset.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Registro no encontrado'
        });
        }
        
        res.json({
        success: true,
        data: result.recordset[0]
        });
    } 
    catch (error) {
        console.error('Error al conseguir los datos:', error.message);
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ API Running' });
});

// Iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor running en http://localhost:${PORT}`);
  });
});

//Cierre de la pool
process.on('exit', () => {
  pool?.close();
});
