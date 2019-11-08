var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ModeloSchema = new Schema({
    codigo: String,
    descripcion: String,
    codigoTipoV: String,
    codigoMarca: String
});

module.exports = mongoose.model("Modelo", ModeloSchema);