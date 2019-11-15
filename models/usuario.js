var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    celular:{type:String, requiered:true,unique:true},
    nombre: {type:String, requiered:true},
    uuid: {type:String, requiered:true,unique:true},
    estado: Boolean,
    mail: {type:String, requiered:true,unique:true,match: /.+\@.+\..+/},
    password: {type:String, requiered:true,validate: [
        function(password){
            return password.length >= 6;
        },
        'El password deberia de ser mas largo ']
    },
    vehiculos: [{ type: Schema.Types.ObjectId, ref: 'Vehiculo' }]
});

module.exports = mongoose.model("Usuario", UsuarioSchema);