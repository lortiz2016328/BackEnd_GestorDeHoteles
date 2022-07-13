const express = require('express');
const modeloServicio = require('../controllers/servicios.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarServicio', md_autenticacion.Auth, modeloServicio.agregarServicio);
api.put ('/editarServicio/:idServicio', md_autenticacion.Auth, modeloServicio.editarServicio);
api.delete('/eliminarServicio/:idServicio', md_autenticacion.Auth, modeloServicio.eliminarServicio);
api.get('/buscarServicios', md_autenticacion.Auth, modeloServicio.buscarServicios);
api.get('/buscarServicioNombre/:nombreServicio', md_autenticacion.Auth, modeloServicio.buscarServicioNombre);


module.exports = api;