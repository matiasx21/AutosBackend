var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecargaCombustibleSchema = new Schema({
    fecha: {type:Date, requiered:true},
    costo: {type:String, requiered:true},
    litros: {type:String, requiered:true},
    efectivo: {type:Boolean, requiered:true},
    codigoDispositivo: {type:String, requiered:true}
});

module.exports = mongoose.model("RecargaCombustible", RecargaCombustibleSchema);