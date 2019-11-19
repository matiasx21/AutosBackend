var express = require("express");
var router = express.Router();
var RecargaCombustible = require("../models/recargaCombustible");

router
    .route("/recargaCombustible")
    .get((req,res) => {
        //Obtengo todos los registros de combustibles
        RecargaCombustible.find((err, recargas) => {
            //Envio los datos
            res.json(recargas);
        })
    })
    .post((req,res) => {
        const {costo, litros, efectivo, codigoDispositivo} = req.body;
        var recargaCombustible = new RecargaCombustible();
        recargaCombustible.fecha = new Date();
        recargaCombustible.costo = costo;
        recargaCombustible.litros = litros;
        recargaCombustible.efectivo = efectivo;
        recargaCombustible.codigoDispositivo = codigoDispositivo;
        recargaCombustible.save((err) => {
            res.json({message: "Se agrego nuevo registro de combustible"});
        })
    })

    router
        .route("/recargaCombustible/:codigoDispositivo")
        .get((req,res) => {
            //Guardo el codigo en una variable
            const codDis = req.params.codigoDispositivo;
            //Busco el Combustible por codigo de dispositivo
            RecargaCombustible.find({'codigoDispositivo':codDis},function(err,recarga){
                try {
                    res.json(recarga);
                } catch (err) {
                    res.json({message: "El numero de dispositivo no se encuentra registrado o no posee registros de combustibles"});
                }
            }).sort({$natural:-1})
            })


    module.exports = router;
    