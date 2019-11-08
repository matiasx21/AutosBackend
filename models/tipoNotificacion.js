var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoNotificacionSchema = new Schema({
    codigo: String,
    descripcion: String
});

module.exports = mongoose.model("TipoNotificacion", TipoNotificacionSchema);