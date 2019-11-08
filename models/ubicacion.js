var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UbicacionSchema = new Schema({
    numeroDispositivo: String,
    fecha: Date,
    latitud: String,
    longitud: String
});

module.exports = mongoose.model("Ubicacion", UbicacionSchema);