const mongoose = require('mongoose');

var Schema=mongoose.Schema;

var reservacionesSchema = Schema({
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hoteles'},
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'},
    numeroDeHabitacion: { type: Schema.Types.Object, ref: 'Habitacion'},
    //idHabitacion { type: Schema.Types.ObjectId, ref: 'Habitacion'},
    fechaInicio:String,
    fechaFinal:String,

})

module.exports=mongoose.model('reservaciones',reservacionesSchema)