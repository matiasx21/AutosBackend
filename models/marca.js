var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarcaSchema = new Schema({
    codigo: String,
    descripcion: String
});

module.exports = mongoose.model("Marca", MarcaSchema);