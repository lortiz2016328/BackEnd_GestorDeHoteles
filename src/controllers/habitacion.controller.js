const Habitacion = require('../models/habitacion.model')
const underscore = require('underscore')
const Hotel = require('../models/hotel.model')

//agregar habitaciones
function agregarHabitacion(req, res) {
    var parametros = req.body
    var habitacionModel = new Habitacion()
    if (parametros.numeroDeHabitacion, parametros.precio, parametros.hotel) {
        Habitacion.findOne({ numeroDeHabitacion: parametros.numeroDeHabitacion }, (err, habitcacionEncontrada) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (underscore.isEmpty(habitcacionEncontrada)) {
                Hotel.findOne({ idAdmin: req.user.sub, nombre: { $regex: parametros.hotel, $options:'i'} }, (err, hotelEncontrado) => {
                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" + err})
                    if (!underscore.isEmpty(hotelEncontrado)) {
                        habitacionModel.numeroDeHabitacion = parametros.numeroDeHabitacion;
                        habitacionModel.disponible = true;
                        habitacionModel.idAdmin = req.user.sub;
                        habitacionModel.idHotel = hotelEncontrado._id;
                        if(parametros.descripcion) habitacionModel.descripcion=parametros.descripcion
                        habitacionModel.save((err, habitacionCreada) => {
                            return res.status(200).send({habitacion: habitacionCreada })
                        })
                    }else{
                        return res.status(500).send({ mensaje: "El hotel no exite, intente con otro" }) 
                    }
                })
            } else {
                return res.status(500).send({ mensaje: "Esa habitacion ya exite, intente con otra" })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "Por favor, llene todos los campos" })
    }
}

function editarHabitacion(req, res) {
    var parametros = req.body
    var idHabitacion = req.params.idHabitacion
    Habitacion.findByIdAndUpdate(idHabitacion, parametros, { new: true }, (err, habitacionEditada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEditada) return res.status(404).send({ mensaje: 'Error no se pudo editar la habitacion' });
        return res.status(200).send({ habitacion: habitacionEditada })
    })
}
 
function eliminarHabitacion(req, res) {
    var idHabitacion = req.params.idHabitacion;
    Habitacion.findByIdAndDelete(idHabitacion, (err, habitacionEliminada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEliminada) return res.status(404).send({ mensaje: 'Error al eliminar la habitacion' });
        return res.status(200).send({habitacion: habitacionEliminada });
    })
}

//listar todas las habitaciones por hotel
function buscarHabitaciones(req, res) {
    Habitacion.find({idAdmin: req.user.sub},(err, habitacionesEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionesEncontradas) return res.status(404).send({ mensaje: 'Error no se pudo obtener las habitaciones' });
        return res.status(200).send({ habitaciones: habitacionesEncontradas })
    })
}

function habitacionDisponible(req, res) {
    let cont = 0;
    let parametros = req.body;
    if (parametros.nombre) {
        Hotel.findOne({ nombre: parametros.nombre }, (err, hotelEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (underscore.isEmpty(hotelEncontrado)) return res.status(404).send({ mensaje: 'Error al obtener el hotel' });

            Habitacion.find({ idHotel: hotelEncontrado._id, disponible: true }, (err, habitacioDisponible) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!habitacioDisponible) return res.status(404).send({ mensaje: 'Error al obtener el hotel' });
                habitacioDisponible.forEach(habitaciones => { habitaciones.nombre, cont++; })
                return res.status(200).send({ habitacion: cont })
            })
        })
    } else {
        return res.status(404).send({ mensaje: 'Ingresa todos los datos, Por favor' })
    }
}

module.exports = {
    agregarHabitacion,
    editarHabitacion,
    eliminarHabitacion,
    buscarHabitaciones,
    habitacionDisponible
}