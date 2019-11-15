var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MatenimientoSchema = new Schema({
    codigoTipoMantenimiento: {type:String, requiered:true},
    descripcion: String,
    tipoParametro:String,
    parametro: String,
    fechaRegistro: Date,
    fechaAviso: Date,
    codigoDispositivo : {type:String, requiered:true}
});

module.exports = mongoose.model("Mantenimiento", MatenimientoSchema);