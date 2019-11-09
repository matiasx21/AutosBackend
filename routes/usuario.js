var express = require("express");
var router = express.Router();
var Usuario = require("../models/usuario");
var Vehiculo = require("../models/vehiculo");

router
    .route("/usuario")
    .get((req,res) => {
        Usuario.find()
        .populate('vehiculos')
        .exec(function(err,usuarios){
            if (err) throw err;
            res.json(usuarios);
          })
        })
    .post((req,res) => {
        const { celular,nombreUsuario,uuid, mail, password, nombreVehiculo,modelo, numeroDispositivo} = req.body;
        var usuarioNuevo = new Usuario();
        var vehiculoNuevo = new Vehiculo();
        usuarioNuevo.celular = celular;
        usuarioNuevo.nombre = nombreUsuario;
        usuarioNuevo.uuid = uuid;
        usuarioNuevo.mail = mail;
        usuarioNuevo.password = password;
        usuarioNuevo.estado = true; 
        vehiculoNuevo.nombre = nombreVehiculo;
        vehiculoNuevo.modelo = modelo;
        vehiculoNuevo.numeroDispositivo = numeroDispositivo;
        vehiculoNuevo.uuidPadre = uuid;
        vehiculoNuevo.save();
        usuarioNuevo.vehiculos.push(vehiculoNuevo);
        usuarioNuevo.save();
        vehiculoNuevo.usuarios.push(usuarioNuevo);
        vehiculoNuevo.save((err) => {
            res.json({message: "Se agrego nuevo usuario"});
        })
    })

    router
        .route("/usuario/:uuid")
        .get((req,res) => {
            //Guardo el uuid en una variable
            const userUuid = req.params.uuid;
            //Busco el usuario por uuid
            Usuario.findOne({'uuid':userUuid})
            //Obtengo los vehiculos de ese usuario
            .populate('vehiculos')
            .exec((err,usuario) => {
                if (err) {
                    //Si hubo error lo muestro
                    res.json(err);
                  } else {
                    if (!usuario) {
                        //Si no encontro el vehiculo lo informo
                        res.json('No existe el usuario');
                    } else {
                        //Devuelvo el usuario
                        res.json(usuario);
                    }
                }
            })
        })
        .put((req,res) => {
            //Obtengo los valores a modificar
            const { celular,nombre }  = req.body;
            //Busco el vehiculo por el numero de dispositivo
            Usuario.findOne({'uuid':userUuid},function(err,usuario){
                try {
                    //Modifico las variables
                    usuario.celular = celular;
                    usuario.nombre = nombre;
                    //Guardo el usuario
                    usuario.save((err) => {
                        //Si hubo error lo muestro
                        if(err) res.json(err);
                        //Informo que se guardo correctamente
                        res.json({message: "Se modifico el usuario correctamente"})
                })
                }
                catch (err) {
                    res.json({message: "El celular no se encuentra registrado"})
                }
            })
        })


        // FALTARIA HACER UN DELETE, PERO ES LOGICO, COMO SERIA?


    module.exports = router;
    