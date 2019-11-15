var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoMatenimientoSchema = new Schema({
    codigo: {type:String, requiered:true,unique:true},
    descripcion: {type:String, requiered:true}
});

module.exports = mongoose.model("TipoMantenimiento", TipoMatenimientoSchema);