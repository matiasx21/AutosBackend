var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VehiculoSchema = new Schema({
    nombre: {type:String, requiered:true},
    marca: {type:String, requiered:true},
    modelo: {type:String, requiered:true},
    uuidPadre: {type:String, requiered:true,unique:true},
    codigoDispositivo: {type:String, requiered:true,unique:true},
    usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model("Vehiculo", VehiculoSchema);