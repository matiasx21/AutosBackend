var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config/properties.json");
var usuarioRouter = require("./routes/usuario");
var vehiculoRouter = require("./routes/vehiculo");
var notificacionRouter = require("./routes/notificacion");
var tipoNotificacionRouter = require("./routes/tipoNotificacion");
var crearVehiculo = require("./routes/crearVehiculo");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
     "PUT, POST, GET, DELETE, OPTIONS");
     next();
});

app.use('/api', usuarioRouter);
app.use('/api',vehiculoRouter);
app.use('/api',notificacionRouter);
app.use('/api',tipoNotificacionRouter);
app.use('/api',crearVehiculo);

mongoose.connect(config.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>{
    app.listen(process.env.PORT || config.port, () => console.log(
        "Application is running under port " + config.port));

}).catch((err) => {
    console.log("Error connecting with MongoDB");
})
