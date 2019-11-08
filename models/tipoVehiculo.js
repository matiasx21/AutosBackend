var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoVehiculoSchema = new Schema({
    codigo: String,
    descripcion: String,
});

module.exports = mongoose.model("TipoVehiculo", TipoVehiculoSchema);