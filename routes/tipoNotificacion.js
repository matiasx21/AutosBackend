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
    
    ;

    module.exports = router;
    