var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UbicacionSchema = new Schema({
    codigoDispositivo: {type:String, requiered:true},
    fecha: {type:Date, requiered:true},
    latitud: {type:String, requiered:true},
    longitud: {type:String, requiered:true}
});

module.exports = mongoose.model("Ubicacion", UbicacionSchema);