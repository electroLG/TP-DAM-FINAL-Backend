var express = require('express');                //importa package de express
var routerMedicion = express.Router();           //Defino el router "routerMedicion"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package

//Espera recibir por parámetro un id de dispositivo y devuelve su última medición
routerMedicion.get('/:id/', function(req, res) {
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId=?  ORDER BY fecha desc', [req.params.id], function(err, result, fields) {
          if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result[0]); //Envío solo el primer elemento que vuelve de la BD
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
routerMedicion.get('/:idDispositivo/todas', function(req, res) {
    pool.query('Select * from Mediciones where dispositivoId=? order by fecha desc', [req.params.idDispositivo], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result); //Se envía todo el vector.
    });
});

//Espera recibir en el body, fecha, valor e dispositivoId para insertar una medicion.
routerMedicion.post('/add', function(req, res) {
    pool.query('Insert into Mediciones (fecha,valor,dispositivoId) values (?,?,?)', [req.body.fecha, req.body.valor, req.body.dispositivoId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerMedicion;         //comparto el routerDispositivo
