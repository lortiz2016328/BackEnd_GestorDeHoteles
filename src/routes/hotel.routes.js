const express = require('express');
const hotelController = require('../controllers/hotel.controller');
const md_autenticacion = require('../middlewares/autenticacion');



const api = express.Router();

api.post('/agregarHotel', md_autenticacion.Auth, hotelController.agregarHotel)
api.put('/editarHotel/:idHotel', md_autenticacion.Auth, hotelController.editarHotel)
api.delete('/eliminarHotel/:idHotel', md_autenticacion.Auth, hotelController.eliminarHotel)
api.get('/buscarHotel', hotelController.buscarHoteles)
api.post('/buscarHotelPorPais', md_autenticacion.Auth, hotelController.buscarHotelesPais)

module.exports = api;