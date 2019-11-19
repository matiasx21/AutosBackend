var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MatenimientoSchema = new Schema({
    codigoTipoMantenimiento: {type:String, requiered:true},
    cantidadMeses: {type:String, requiered:true},
    fechaRegistro: Date,
    fechaAviso: Date,
    codigoDispositivo : {type:String, requiered:true}
});

module.exports = mongoose.model("Mantenimiento", MatenimientoSchema);