// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const UsuariosRutas = require('./src/routes/usuarios.routes');
const EventosRutas = require('./src/routes/eventos.routes');
const HabitacionRutas = require('./src/routes/habitacion.routes');
const HotelRutas = require('./src/routes/hotel.routes');
const ServiciosRutas = require('./src/routes/servicios.routes');
const ReservacionRutas = require('./src/routes/reservacion.routes');
// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

app.use('/api', UsuariosRutas, EventosRutas, HotelRutas, HabitacionRutas, ServiciosRutas, ReservacionRutas);


module.exports = app;