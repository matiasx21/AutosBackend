var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    celular: String,
    nombre: String,
    uuid: String,
    estado: Boolean,
    mail: String,
    password: String,
    vehiculos: [{ type: Schema.Types.ObjectId, ref: 'Vehiculo' }]
});

module.exports = mongoose.model("Usuario", UsuarioSchema);