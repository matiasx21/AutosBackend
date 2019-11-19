var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecargaCombustibleSchema = new Schema({
    fecha: {type:Date, requiered:true},
    costo: String,
    litros: String,
    efectivo: Boolean,
    codigoDispositivo: {type:String, requiered:true}
});

module.exports = mongoose.model("RecargaCombustible", RecargaCombustibleSchema);