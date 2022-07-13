const express = require('express');
const EventoController = require('../controllers/eventos.controller');
const md_autenticacion = require('../middlewares/autenticacion');



const api = express.Router();

api.post('/agregarEvento', md_autenticacion.Auth,EventoController.agregarEvento);
api.put('/editarEvento/:idEvento', md_autenticacion.Auth, EventoController.editarEvento);
api.delete('/eliminarEvento/:idEvento', md_autenticacion.Auth, EventoController.eliminarEvento);
api.get('/buscarEvento',md_autenticacion.Auth, EventoController.buscarEvento);
module.exports = api;