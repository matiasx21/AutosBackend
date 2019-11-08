var express = require("express");
var router = express.Router();
var Ubicacion = require("../models/ubicacion");


//ARREGLAR, HAY QUE FILTRAR Y QUEDARSE CON LA QUE TENGA LA FECHA MAS GRANDE.
    router
        .route("/ubicacion/:numeroDispositivo")
        .get((req,res) => {
            //Guardo el numero de dispositivo en una variable.
            var numDisp = req.params.numeroDispositivo;
            //Obtengo las ubicaciones del vehiculo por numero de dispositivo
            Ubicacion.findOne({'numeroDispositivo':numDisp},function(err,Ubicacion){
                try {
                    //Filtro y me quedo con la ultima ubicacion
                    var ubi = Ubicacion.sort({$natural:-1}).limit(1);
                    //Retorno la ubicacion
                    res.json(ubi);
                } catch (err) {
                    //Si hubo erro lo muestro
                    res.json({message: "No se ecuentra ninguna ubicacion con ese numero de dispositivo"});
                }
            })
        })
        .post((req,res) => {
            //Guardo el numero de dispositivo en una variable.
            var numDisp = req.params.numeroDispositivo;
            //Obtengo los datos de la request
            const {fecha, latitud,longitud} = req.body;
            //Creo una nueva notificacion
            var nuevaUbicacion = new Ubicacion();
            nuevaUbicacion.numeroDispositivo = numDisp;
            nuevaUbicacion.fecha = fecha;
            nuevaUbicacion.latitud = latitud;
            nuevaUbicacion.longitud = longitud;
            nuevaUbicacion.save((err) => {
                //Si hubo error lo retorno
                if(err) res.json(err);
                //Muestro mensaje
                res.json({message: "Se agrego una nueva Ubicacion"});
            });
        })
        // FALTARIA HACER UN DELETE, DEL DIA ANTERIOR.
        .delete((req,res) => {
            //Guardo el numero de dispositivo en una variable.
            var numDisp = req.params.numeroDispositivo;
            //Creo una nueva notificacion
            var ubi = new Ubicacion();
            ubi.find({'numeroDispositivo':numDisp});

            ubi.deleteMany((err) => {
                //Si hubo error lo retorno
                if(err) res.json(err);
                //Muestro mensaje
                res.json({message: "Se eliminaron ubicaciones viejas"});
            });
        });

    module.exports = router;
    