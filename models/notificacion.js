var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotificacionSchema = new Schema({
    tipoNotificacion: {type:String, requiered:true},
    codigoDispositivo: {type:String, requiered:true},
    estado: {type:Boolean, requiered:true},
    fecha: {type:Date, requiered:true}
});

module.exports = mongoose.model("Notificacion", NotificacionSchema);