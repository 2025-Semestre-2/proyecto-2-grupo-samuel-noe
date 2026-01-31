const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Importación de rutas
const authRoutes = require('./routes/auth.routes');
const hospedajeRoutes = require('./routes/hospedaje.routes');
const clienteRoutes = require('./routes/cliente.routes');
const habitacionRoutes = require('./routes/habitacion.routes');
const recreacionRoutes = require('./routes/recreacion.routes');
const reporteRoutes = require('./routes/reporte.routes');
const usuarioRoutes = require('./routes/usuario.routes');
// const facturasRoutes = require('./routes/factura.routes'); // Habilitar al crear archivo

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Definición de Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/hospedaje', hospedajeRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/habitacion', habitacionRoutes);
app.use('/api/recreacion', recreacionRoutes);
app.use('/api/reporte', reporteRoutes);
app.use('/api/usuario', usuarioRoutes);
// app.use('/api/factura', facturasRoutes);

module.exports = app;