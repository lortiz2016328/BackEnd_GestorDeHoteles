const mongoose = require('mongoose');

var Schema=mongoose.Schema;

var habitacionesSchema = Schema({
    nit: String,
    estado:String,
    fecha: String,
    idAdmin: { type: Schema.Types.ObjectId, ref: 'Usuarios'},
    idServicios : { type: Schema.Types.ObjectId, ref: 'Servicio'}
})

module.exports=mongoose.model('habitaciones',habitacionesSchema)