var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotificacionSchema = new Schema({
    tipoNotificacion: String,
    numeroDispositivo: String,
    fecha: Date
});

module.exports = mongoose.model("Notificacion", NotificacionSchema);