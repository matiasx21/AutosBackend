var express = require("express");
var router = express.Router();
var Vehiculo = require("../models/vehiculo");
var Usuario = require("../models/usuario");


router
    .route("/vehiculo")
    .get((req,res) => {
        //Busco todos los vehiculos
        Vehiculo.find()
        //Obtengo los usuarios de la lista de usuarios de cada vehiculo
        .populate('usuarios')
        .exec(function(err,vehiculos){
            //Si hubo error lo retorno
            if (err) res.json(err);
            //Retorno los vehiculos
            res.json(vehiculos);
          })
    })
    .post((req,res) => {
        const { nombre, modelo, codigoDispositivo, uuidPadre } = req.body;
        //creo un nuevo vehiculo
        var vehiculoNuevo = new Vehiculo();
        //Creo un nuevo usuario
        var usuario = new Usuario();
        //Busco al usuario por uuid.
        var usu =  Usuario.findOne({'uuid':uuidPadre},function(err,usuario2){
            usuario = usuario2;

        if(usuario != null){
            vehiculoNuevo.nombre = nombre;
            vehiculoNuevo.modelo = modelo;
            vehiculoNuevo.codigoDispositivo = codigoDispositivo;
            vehiculoNuevo.uuidPadre = uuidPadre;
            //Inserte el usuario en la lista de usuarios del vehiculo
            vehiculoNuevo.usuarios.push(usuario);
            //Inserto el vehiculo
            vehiculoNuevo.save((err,vehiculo) =>{
                if(err) res.json(err);
                //Si no hubo error inserto el vehiculo en la lista de vehiculos del usuario
                usuario.vehiculos.push(vehiculo);
                usuario.save((err) => {
                    //Si hubo error al ingresar el nuevo vehiculo en la lista lo devuelvo
                    if(err) res.json(err);
                    res.json({message: "Se agrego nuevo vehiculo correctamente"});
            });
            })
            //console.log("entre",usuario);

        }
        })

        


    });

   

router
.route("/vehiculo/:codigoDispositivo")
.get((req,res) => {
    console.log("bien");
    //Guardo el numero de dispositivo en una variable
    const numDisp = req.params.codigoDispositivo;
    //Busco el vehiculo por numero de dispositivo
    Vehiculo.findOne({'codigoDispositivo':numDisp})
    //Obtengo los usuarios de ese vehiculo
    .populate('usuarios')
    .exec((err,vehiculo) => {
        if (err) {
            //Si hubo error lo muestro
            res.json(err);
          } else {
            //Si no encontro el vehiculo lo informo
            if (!vehiculo) {
              res.json('No existe el numero de dispositivo');
            } else {
              //Devuelvo el vehiculo
              res.json(vehiculo);
            }
    }
    })
})
.put((req,res) => {
    //Obtengo los valores a modificar
    const { nombre,marca, codigoModelo}  = req.body;
    //Busco el vehiculo por el numero de dispositivo
    const numDisp = req.params.codigoDispositivo;
    
    Vehiculo.findOne({'codigoDispositivo':numDisp},function(err,Vehiculo){
        try {
            //Modifico las variables
            Vehiculo.nombre = nombre;
            Vehiculo.marca = marca;
            Vehiculo.modelo = codigoModelo;
            //Guardo el vehiculo
            Vehiculo.save((err) => {
                //Si hubo error lo muestro
                if(err) res.json(err);
                //Informo que se guardo correctamente
                res.json({message: "Se modifico el vehiculo correctamente"})
            });
        }
        catch (err) {
            res.json({message: "El numero de dispositivo no se encuentra registrado"})
        }
    })
})
// FALTARIA HACER UN DELETE, UNO LOGICO PARA EL USUARIO CREADOR Y OTRO REAL DE RELACION PARA OTROS USUARIOS

    module.exports = router;