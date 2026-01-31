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
const telefonoHotelRoutes = require('./routes/telefonoHotel.routes');
const redSocialHotelRoutes = require('./routes/redSocialHotel.routes');
const catalogoRedesRoutes = require('./routes/catalogoRedes.routes');
const catalogoServiciosRoutes = require('./routes/catalogoServicios.routes');
const servicioHospedajeRoutes = require('./routes/servicioHospedaje.routes');
const tipoHabitacionRoutes = require('./routes/tipoHabitacion.routes');
const comodidadHabitacionRoutes = require('./routes/comodidadHabitacion.routes');
const fotoHabitacionRoutes = require('./routes/fotoHabitacion.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Definición de endpoints
app.use('/api/auth', authRoutes);
app.use('/api/hospedaje', hospedajeRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/habitacion', habitacionRoutes);
app.use('/api/recreacion', recreacionRoutes);
app.use('/api/reporte', reporteRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/util', require('./routes/util.routes'));
app.use('/api/telefono-hotel', telefonoHotelRoutes);
app.use('/api/red-social-hotel', redSocialHotelRoutes);
app.use('/api/catalogo-redes', catalogoRedesRoutes);
app.use('/api/catalogo-servicios', catalogoServiciosRoutes);
app.use('/api/servicio-hospedaje', servicioHospedajeRoutes);
app.use('/api/tipo-habitacion', tipoHabitacionRoutes);
app.use('/api/comodidad-habitacion', comodidadHabitacionRoutes);
app.use('/api/foto-habitacion', fotoHabitacionRoutes);

module.exports = app;