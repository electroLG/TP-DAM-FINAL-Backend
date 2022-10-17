var express = require('express');                //importa package de express
var routerDispositivo = express.Router();        //Defino el router "routerDispositivo"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package


//Devuelve el listado de dispositivos

routerDispositivo.get('/', function(req, res) {
    pool.query('SELECT * FROM Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });

});

//Devuelve informacion del dispositivo que fué consultado por parámetro
routerDispositivo.get('/:id/', function(req, res) {
    pool.query('SELECT * FROM Dispositivos WHERE dispositivoId=?', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });

});

module.exports = routerDispositivo;         //comparto el routerDispositivo
