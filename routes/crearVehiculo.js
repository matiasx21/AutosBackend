var express = require("express");
var router = express.Router();
var TipoVehiculo = require("../models/tipoVehiculo");
var Marca = require("../models/marca");
var Modelo = require("../models/modelo");

router
    .route("/tipoVehiculo")
    .get((req,res) => {
        TipoVehiculo.find((err, tipoVehiculo) => {
            res.json(tipoVehiculo);
        })
    })
    .post((req,res) => {
        //Obtengo los datos de la request
        const {codigo, descripcion} = req.body;
        //Creo una nueva notificacion
        var nuevotipoVehiculo = new TipoVehiculo();
        nuevotipoVehiculo.codigo = codigo;
        nuevotipoVehiculo.descripcion = descripcion;
        nuevotipoVehiculo.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego un nuevo tipo de vehiculo"});
        })
    })
    
    router
    .route("/marca")
    .get((req,res) => {
        Marca.find((err, marcas) => {
            res.json(marcas);
        })
    })
    .post((req,res) => {
        const {codigo, descripcion} = req.body;
        var nuevaMarca = new Marca();
        nuevaMarca.codigo = codigo;
        nuevaMarca.descripcion = descripcion;
        nuevaMarca.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego una nueva Marca"});
        });
    })

    router
    .route("/modelo")
    .get((req,res) => {
        Modelo.find((err, modelos) => {
            res.json(modelos);
        })
    })
    .post((req,res) => {
        const {codigo, descripcion, codigoTipoV, codigoMarca} = req.body;
        var nuevoModelo = new Modelo();
        nuevoModelo.codigo = codigo;
        nuevoModelo.descripcion = descripcion;
        nuevoModelo.codigoTipoV = codigoTipoV;
        nuevoModelo.codigoMarca = codigoMarca;
        nuevoModelo.save((err) => {
            //Si hubo error lo retorno
            if(err) res.json(err);
            //Muestro mensaje
            res.json({message: "Se agrego un nuevo modelo"});
        });
    });
    router
    .route("/modelo/:codigoTipoV")
    .get((req,res) => {
        const tipoV = req.params.codigoTipoV;
        Modelo.findOne({'codigoTipoV':tipoV},function(err,unModelo){
            try {
                res.json(unModelo);
            } catch (err) {
                res.json({message: "No se encontraron modelos para ese tipo de marca y vehiculo"});
            }
        })
    });

    router
    .route("/modelo/:codigoTipoV/:codigoMarca")
    .get((req,res) => {
        const marca = req.params.codigoMarca;
        const tipoV = req.params.codigoTipoV;
        Modelo.find({'codigoTipoV':tipoV,'codigoMarca':marca},function(err,Modelos){
            try {
                res.json(Modelos);
            } catch (err) {
                res.json({message: "No se encontraron modelos para ese tipo de marca y vehiculo"});
            }
        })
    });


    module.exports = router;
    