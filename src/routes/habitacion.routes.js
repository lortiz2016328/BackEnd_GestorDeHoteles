const express = require('express');
const habitacionController = require('../controllers/habitacion.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarHabitacion', md_autenticacion.Auth, habitacionController.agregarHabitacion);
api.put('/editarHabitacion/:idHabitacion', md_autenticacion.Auth,habitacionController.editarHabitacion);
api.delete('/eliminarHabitacion/:idHabitacion', md_autenticacion.Auth, habitacionController.eliminarHabitacion);
api.get('/buscarHabitaciones', md_autenticacion.Auth, habitacionController.buscarHabitaciones);
api.post('/buscarHotelDisponible', habitacionController.habitacionDisponible);
module.exports = api;