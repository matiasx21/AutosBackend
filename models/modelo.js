var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ModeloSchema = new Schema({
    codigo: {type:String, requiered:true},
    descripcion: {type:String, requiered:true},
    codigoTipoV: {type:String, requiered:true},
    codigoMarca: {type:String, requiered:true}
});

module.exports = mongoose.model("Modelo", ModeloSchema);