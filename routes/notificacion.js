var express = require("express");
var router = express.Router();
var Notificacion = require("../models/notificacion");

router
    .route("/notificacion")
    .get((req,res) => {
        //Obtengo todas las notificaciones
        Notificacion.find((err, notificaciones) => {
            //Envio las notificaciones
            res.json(notificaciones);
        })
    })
    .post((req,res) => {
        //Obtengo los datos de la request
        const {tipoNotificacion, numeroDispositivo, fecha} = req.body;
        //Creo una nueva notificacion
        var nuevaNotificacion = new Notificacion();
        nuevaNotificacion.tipoNotificacion = tipoNotificacion;
        nuevaNotificacion.numeroDispositivo = numeroDispositivo;
        nuevaNotificacion.fecha = fecha;
        nuevaNotificacion.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego una nueva notificacion"});
        });
    });

    router
        .route("/notificacion/:numeroDispositivo")
        .get((req,res) => {
            var numDisp = req.params.numeroDispositivo;
            Notificacion.findOne({'numeroDispositivo':numDisp},function(err,Notificacion){
                try {
                    res.json(Notificacion);
                } catch (err) {
                    res.json({message: "El numero de dispositivo no se encuentra registrado"});
                }
            })
        });

        // FALTARIA HACER UN GET BY NUMERO DE DISPOSITIVO BY TIPO DE NOTIFICACION (AMBOS)
        router
        .route("/notificacion/:numeroDispositivo/:tipoNotificacion")
        .get((req,res) => {
            var numDisp = req.params.numeroDispositivo;
            var tipoNot = req.params.tipoNotificacion;
            Notificacion.findOne({'numeroDispositivo':numDisp,'tipoNotificacion':tipoNot},function(err,Notificacion){
                try {
                    res.json(Notificacion);
                } catch (err) {
                    res.json({message: "El numero de dispositivo no se encuentra registrado o no posee notificaciones de ese tipo"});
                }
            })
        });

        

        ;

    module.exports = router;
    