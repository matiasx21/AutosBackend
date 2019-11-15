var express = require("express");
var router = express.Router();
var TipoNotificacion = require("../models/tipoNotificacion");

router
    .route("/tipoNotificacion")
    .get((req,res) => {
        TipoNotificacion.find((err, tiposNotificaciones) => {
            res.json(tiposNotificaciones);
        })
    })
    .post((req,res) => {
        //Obtengo los datos de la request
        const {codigo, descripcion } = req.body;
        //Creo una nueva notificacion
        var tipoNotificacion = new TipoNotificacion();
        tipoNotificacion.codigo = codigo,
        tipoNotificacion.descripcion =  descripcion
        tipoNotificacion.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego un nuevo tipo de notificacion"});
        });
    });
    
    ;

    module.exports = router;
    