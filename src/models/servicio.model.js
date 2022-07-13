const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicioSchema = Schema({
    nombreServicio: String,
    descripcion: String,
    precio: Number,
    idAdmin:{type: Schema.Types.ObjectId, ref: 'Usuarios' },
    idHotel:{type: Schema.Types.ObjectId, ref: 'Hotel' }
})

module.exports = mongoose.model('Servicio', ServicioSchema);