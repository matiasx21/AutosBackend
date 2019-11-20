var express = require("express");
var router = express.Router();
var Mantenimiento = require("../models/mantenimiento");
var TipoMantenimiento = require("../models/tipoMantenimiento");

router
    .route("/tipoMantenimiento")
    .get((req,res) => {
        //Obtengo todos los tipo de mantenimiento
        TipoMantenimiento.find((err, tipoMant) => {
            //Envio las notificaciones
            res.json(tipoMant);
        })
    })
    .post((req,res) => {
        const { codigo, descripcion} = req.body;
        var tipoMantenimiento = new TipoMantenimiento();
        tipoMantenimiento.codigo = codigo;
        tipoMantenimiento.descripcion = descripcion;
        tipoMantenimiento.save((err) => {
            res.json({message: "Se agrego nuevo tipo de mantenimiento"});
        })
    })

    router
    .route("/mantenimiento")
    .get((req,res) => {
        //Obtengo todos los tipo de mantenimiento
        Mantenimiento.find((err, mant) => {
            //Envio las notificaciones
            res.json(mant);
        })
    })
    .post((req,res) => {
        const { codigoTipoMantenimiento, cantidadMeses, codigoDispositivo} = req.body;
        var mantenimiento = new Mantenimiento();
        mantenimiento.codigoTipoMantenimiento = codigoTipoMantenimiento;
        mantenimiento.cantidadMeses = cantidadMeses;
        mantenimiento.fechaRegistro = new Date();
        var fechaAviso = new Date();
        fechaAviso.setMonth(fechaAviso.getMonth()+cantidadMeses);
        mantenimiento.fechaAviso = fechaAviso;
        mantenimiento.codigoDispositivo = codigoDispositivo;
        mantenimiento.save((err) => {
            res.json({message: "Se agrego nuevo mantenimiento"});
        })
    })


    router
        .route("/mantenimiento/:codigoDispositivo")
        .get((req,res) => {
            const codDisp = req.params.codigoDispositivo;
            Mantenimiento.find({'codigoDispositivo':codDisp},function(err,mantenimientos){
            try {
                res.json(mantenimientos);
            } catch (err) {
                res.json({message: "El numero de dispositivo no se encuentra registrado o no posee notificaciones de ese tipo"});
            }
        })
        })

    router
        .route("/mantenimiento/:codigoDispositivo/:codigoTipoMantenimiento")
        .put((req,res) => {
            const codDisp = req.params.codigoDispositivo;
            const tipoMant = req.params.codigoTipoMantenimiento;
            const {cantidadMeses} = req.body;
            Mantenimiento.findOne({'codigoDispositivo':codDisp,'codigoTipoMantenimiento':tipoMant},function(err,Mantenimiento){
                try {
                    mantenimiento.cantidadMeses = cantidadMeses;
                    mantenimiento.fechaRegistro = new Date();
                    var fechaAviso = new Date();
                    fechaAviso.setMonth(fechaAviso.getMonth()+cantidadMeses);
                    mantenimiento.fechaAviso = fechaAviso;
                    mantenimiento.codigoDispositivo = codigoDispositivo;
                    //Guardo el mantenimiento
                    Mantenimiento.save((err) => {
                        //Si hubo error lo muestro
                        if(err) res.json(err);
                        //Informo que se guardo correctamente
                        res.json({message: "Se modifico el mantenimiento correctamente"})
                    });
                }
                catch (err) {
                    console.log(err);
                    res.json({message: "El codigo de dispositivo no se encuentra registrado"})
                }
            })
        })



    module.exports = router;
    