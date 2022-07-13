const express = require('express');
const reservacionesController = require('../controllers/reservacion.controller');
const md_autentificacion = require('../middlewares/autenticacion');

var app = express.Router();

app.get("/reservaciones-hotel/:idHotel", md_autentificacion.Auth,reservacionesController.obtenerReservacionHotel);
app.get("/reservaciones-usuario", md_autentificacion.Auth,reservacionesController.obtenerReservacionesUsuario);
app.post('/crear-reservacion', md_autentificacion.Auth, reservacionesController.agregarReservacion);
app.put('/editar-reservacion/:idReservacion', md_autentificacion.Auth, reservacionesController.editarReservacion)
app.delete('/eliminar-reservacion/:idReservacion', md_autentificacion.Auth, reservacionesController.eliminarReservacion);
app.post('/generarFactura', md_autentificacion.Auth,reservacionesController.generarFactura);

 
module.exports = app;