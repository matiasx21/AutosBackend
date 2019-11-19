var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarcaSchema = new Schema({
    codigo: {type:String, requiered:true},
    descripcion: {type:String, requiered:true}
});

module.exports = mongoose.model("Marca", MarcaSchema);