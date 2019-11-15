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
        const {tipoNotificacion, codigoDispositivo, fecha} = req.body;
        //Creo una nueva notificacion
        var nuevaNotificacion = new Notificacion();
        nuevaNotificacion.tipoNotificacion = tipoNotificacion;
        nuevaNotificacion.codigoDispositivo = codigoDispositivo;
        nuevaNotificacion.fecha = fecha;
        nuevaNotificacion.estado = false;
        nuevaNotificacion.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego una nueva notificacion"});
        });
    });

    router
        .route("/notificacion/:codigoDispositivo")
        .get((req,res) => {
            var codDis = req.params.codigoDispositivo;
            Notificacion.find({'codigoDispositivo':codDis},function(err,Notificacion){
                try {
                    res.json(Notificacion);
                } catch (err) {
                    res.json({message: "El numero de dispositivo no se encuentra registrado"});
                }
            })
        });

        router
        .route("/notificacion/:codigoDispositivo/:tipoNotificacion")
        .get((req,res) => {
            var codDis = req.params.codigoDispositivo;
            var tipoNot = req.params.tipoNotificacion;
            Notificacion.find({'codigoDispositivo':codDis,'tipoNotificacion':tipoNot},function(err,Notificacion){
                try {
                    res.json(Notificacion);
                } catch (err) {
                    res.json({message: "El numero de dispositivo no se encuentra registrado o no posee notificaciones de ese tipo"});
                }
            })//.sort({$natural:-1}).limit(1)
        });
        

    module.exports = router;
    