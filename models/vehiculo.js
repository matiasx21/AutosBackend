var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VehiculoSchema = new Schema({
    nombre: String,
    marca: String,
    modelo: String,
    uuidPadre: String,
    codigoDispositivo: String,
    usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model("Vehiculo", VehiculoSchema);