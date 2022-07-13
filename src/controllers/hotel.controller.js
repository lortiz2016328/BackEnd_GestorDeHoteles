const Hotel = require('../models/hotel.model')
const underscore = require('underscore')


// Agregar
function agregarHotel(req, res) {
    let parametros = req.body
    if (parametros.nombre && parametros.direccion && parametros.pais) {

        Hotel.find({ nombre: parametros.nombre }, (err, hotelesEncontrados) => {
            if (err) return res.status(404).send({ mensaje: 'Error en la peticion'});
            if (underscore.isEmpty(hotelesEncontrados)) {
                let hotelModel = new Hotel();
                hotelModel.nombre = parametros.nombre;
                hotelModel.direccion = parametros.direccion;
                hotelModel.pais = parametros.pais;
                hotelModel.idAdmin = req.user.sub;
                hotelModel.save((err, hotelGuardado) => {
                    if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
                    return res.status(200).send({ mensaje: hotelGuardado })
                })

            } else {
                return res.status(200).send({ mensaje: 'Ese nombre ya esta siendo utilizado, intento con otro' })
            }
        })

    } else {
        return res.status(500).send({ mensaje: 'Por favor, llene todos los campos' })
    }

}

function editarHotel(req, res) {
    let idHotel = req.params.idHotel;
    let parametros = req.body
    if (parametros.dueno || parametros.idAdmin) {
        return res.status(500).send({ mensaje: 'No puedes cambiar ese campo, intenta de nuevo' })
    } else {
        Hotel.findById(idHotel, (err, hotelesEncontrados) => {
            if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
            if (underscore.isEmpty(hotelesEncontrados)) {
                return res.status(404).send({ mensaje: 'No existe un hotel con ese id' })
            } else {
                if (hotelesEncontrados.idAdmin === req.user.sub) {
                    Hotel.findByIdAndUpdate(idHotel, parametros, { new: true }, (err, hotelEditado) => {
                        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
                        return res.status(200).send({ mensaje: hotelEditado })
                    })
                } else {
                    return res.status(404).send({ mensaje: 'Ese Hotel no existe, intenta de nuevo' })
                }
            }
        })
    }
}

function eliminarHotel(req, res) {
    let idH = req.params.idHotel;
    Hotel.findById(idH, (err, hotelesEncontrados) => {
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
        if (underscore.isEmpty(hotelesEncontrados)) {
            return res.status(404).send({ mensaje: 'No existe un hotel con ese id' })
        } else {
            if (hotelesEncontrados.idAdmin === req.user.sub) {
                Hotel.findByIdAndDelete(idH, (err, hotelEditado) => {
                    if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
                    return res.status(200).send({ mensaje: hotelEditado })
                })
            } else {
                return res.status(404).send({ mensaje: 'Ese Hotel no existe, intenta de nuevo' })
            }
        }
    })
}

function buscarHoteles(req, res) {
    Hotel.find((err, hotelesEncontrados) => {
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
        if (!hotelesEncontrados) return res.status(404).send({ mensaje: 'Por favor, llena los campos' });
        return res.status(200).send({ mensaje: hotelesEncontrados })
    })
}

function buscarHotelesPais(req, res) {
    let parametros = req.body
    if (parametros.pais) {
        Hotel.find({ pais: parametros.pais }, (err, hotelesEncontrados) => {
            if (err) return res.status(404).send({ mensaje: 'Error en la peticion' });
            if (!hotelesEncontrados) return res.status(404).send({ mensaje: 'Por favor, llena los campos' });
            return res.status(200).send({ mensaje: hotelesEncontrados })
        })
    } else {
        return res.status(404).send({ mensaje: 'Por favor, llena todos los campos' })
    }
}

module.exports = {
    agregarHotel,
    editarHotel,
    eliminarHotel,
    buscarHoteles,
    buscarHotelesPais
}