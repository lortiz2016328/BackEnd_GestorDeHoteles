const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = Schema({
    nombre: String,
    direccion: String,
    pais: String,
    idAdmin: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})


module.exports = mongoose.model('Hoteles', HotelSchema);