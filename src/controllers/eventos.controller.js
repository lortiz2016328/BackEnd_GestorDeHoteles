const Hotel = require('../models/hotel.model')
const evento = require('../models/eventos.model')
const underscore = require('underscore');

function agregarEvento(req, res) {
    var parametros = req.body;
    var eventoModel = new evento;
    if (parametros.nombreEvento, parametros.precio) {
        evento.findOne({ nombreEvento: parametros.nombreEvento }, (err, eventoAgregado) => {
            if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
            if (underscore.isEmpty(eventoAgregado)) {
                Hotel.findOne({ nombre: parametros.nombreHotel }, (err, hotelEncontrado) => {
                    eventoModel.nombreEvento = parametros.nombreEvento;
                    eventoModel.descripcion = parametros.descripcion;
                    eventoModel.precio = parametros.precio;
                    eventoModel.idAdmin = req.user.sub;
                    eventoModel.idHotel = hotelEncontrado._id;
                    eventoModel.save((err, eventoGuardado) => {
                        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' })
                        return res.status(200).send({ mensaje: eventoGuardado })
                    })
                })
            } else {
                return res.status(200).send({ mensaje: 'Ese nombre ya esta utilizado, intente con otro' })
            }
        })
    } else {
        return res.status(500).send({ mensaje: 'Por favor, llena todos los campos' })
    }

}

function editarEvento(req, res) {
    var idEvento = req.params.idEvento;
    var parametros = req.body;
    evento.findByIdAndUpdate(idEvento, parametros, { new: true }, (err, eventoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!eventoEditado) return res.status(404).send({ mensaje: 'Error al editar el usuario' });
        return res.status(200).send({ evento: eventoEditado })
    })

}

function eliminarEvento(req, res) {
    var idEvento = req.params.idEvento;
    evento.findByIdAndDelete(idEvento, (err, eventoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!eventoEliminado) return res.status(404).send({ mensaje: 'Error al eliminar el evento' });
        return res.status(200).send({ evento: eventoEliminado });
    })

}

function buscarEvento(req, res) {
    evento.find((err, eventoEncontrado) => {
        if (err) return res.send({ mensaje: "Error: " + err })
        for (let i = 0; i < eventoEncontrado.length; i++) {
        }
        return res.status(200).send({ Evento: eventoEncontrado })
    })
}

module.exports = {
    agregarEvento,
    editarEvento,
    eliminarEvento,
    buscarEvento,
}