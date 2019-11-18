var express = require("express");
var router = express.Router();
var Ubicacion = require("../models/ubicacion");

    router
    .route("/ubicacion")
    .post((req,res) => {
        //Guardo el numero de dispositivo en una variable.
        var codDisp = req.params.codigoDispositivo;
        //Obtengo los datos de la request
        const {latitud,longitud} = req.body;
        //Creo una nueva notificacion
        var nuevaUbicacion = new Ubicacion();
        nuevaUbicacion.codigoDispositivo = codDisp;
        nuevaUbicacion.fecha = new Date();
        nuevaUbicacion.latitud = latitud;
        nuevaUbicacion.longitud = longitud;
        nuevaUbicacion.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego una nueva Ubicacion"});
        });
    })
    ;
    router
        .route("/ubicacion/:codigoDispositivo")
        .get((req,res) => {
            //Guardo el numero de dispositivo en una variable.
            var codDisp = req.params.codigoDispositivo;
            //Obtengo las ubicaciones del vehiculo por numero de dispositivo
            Ubicacion.find({'codigoDispositivo':codDisp},function(err,ubicacion){
                try {
                    //Retorno la ubicacion
                    res.json(ubicacion);
                } catch (err) {
                    //Si hubo erro lo muestro
                    res.json({message: "No se ecuentra ninguna ubicacion con ese codigo de dispositivo"});
                }
            }).sort({$natural:-1}).limit(1)
        })
        .delete((req,res) => {
            //Guardo el numero de dispositivo en una variable.
            var codDisp = req.params.codigoDispositivo;
            var fecha = new Date();
            console.log(fecha);
            fecha.setDate(fecha.getDate() - 1);
            Ubicacion.deleteMany({'codigoDispositivo':codDisp,'fecha':fecha},function(err,ubicacion){
                try {
                    //Retorno la ubicacion
                    res.json({message: "Se eliminaron ubicaciones viejas"});
                } catch (err) {
                    //Si hubo erro lo muestro
                    res.json({message: "No se ecuentra ninguna ubicacion con ese codigo de dispositivo"});
                }
            });
        });

    module.exports = router;
    