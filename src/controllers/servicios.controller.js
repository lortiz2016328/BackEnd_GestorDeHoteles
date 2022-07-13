const Servicio = require('../models/servicio.model');
const Hotel = require('../models/hotel.model');
const underscore = require('underscore');

function agregarServicio(req, res) {
    var parametros = req.body;
    var servicioModel = new Servicio;

    if (parametros.nombreServicio, parametros.precio, parametros.descripcion, parametros.hotel) {
        Servicio.findOne({ nombreServicio: parametros.nombreServicio }, (err, servicioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (underscore.isEmpty(servicioEncontrado)) {

                Hotel.findOne({ idAdmin: req.user.sub, nombre: { $regex: parametros.hotel, $options:'i'} }, (err, hotelEncontrado) => {
                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" + err})
                    if (!underscore.isEmpty(hotelEncontrado)) {
                        servicioModel.nombreServicio = parametros.nombreServicio;
                        servicioModel.precio = parametros.precio;
                        servicioModel.descripcion = parametros.descripcion;
                        servicioModel.idAdmin=req.user.sub;
                        servicioModel.idHotel=hotelEncontrado._id;
                        servicioModel.save((err, servicioGuardado) => {
                            if (err) return res.status(404).send({ mensaje: 'Error en la peticion' })
                            return res.status(200).send({ mensaje: servicioGuardado })
                        })
                    }
                })
            } else {
                return res.status(500).send({ mensaje: "el servicio ya existe" })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "Por favor, llene todos los campos" })
    }
}

function editarServicio(req, res){
    var parametros = req.body;
    var idServicio = req.params.idServicio;

    Servicio.findByIdAndUpdate(idServicio, parametros,{new : true}, (err, servicioEditado)=>{

        if (err) return res.status(500).send({mensaje: "Error en la peticion"});
        if (!servicioEditado) return res.status(500).send({mensaje: "El servicio no existe, intenta de nuevo"});

        if (servicioEditado) return res.status(200).send({Servicios: servicioEditado});
    })
}

function eliminarServicio(req,res){
    var idServicio = req.params.idServicio;

    Servicio.findByIdAndDelete(idServicio, (err, servicioEliminado)=>{
        if (err) return res.status(404).send({mensaje: "Error en la peticion"});
        if(!servicioEliminado) return res.status(404).send({mensaje: "El servicio no existe, intenta de nuevo"});

        if(servicioEliminado) return res.status(200).send({Servicios: servicioEliminado});
    })
}

function buscarServicios(req, res) {
    Servicio.find({idAdmin: req.user.sub},(err, serviciosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!serviciosEncontrados) return res.status(404).send({ mensaje: 'Error al encotrar los servicios' });

        return res.status(200).send({Servicios: serviciosEncontrados });
    })
}

function buscarServicioNombre(req, res){
    var nombreService = req.params.nombreServicio;

    Servicio.findOne( { nombre : { $regex: nombreService, $options: 'i' }}, (err, servicioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!servicioEncontrado) return res.status(404).send({ mensaje: "Error al encotrar el servicio" });

        return res.status(200).send({ Servicio: servicioEncontrado });
    })
}


module.exports={
    agregarServicio,
    editarServicio,
    eliminarServicio,
    buscarServicios,
    buscarServicioNombre
}