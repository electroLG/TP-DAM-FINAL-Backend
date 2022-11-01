var express = require('express');                //importa package de express
var routerGrafico = express.Router();           //Defino el router "routerMedicion"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package

//Espera recibir por parámetro un id de dispositivo y devuelve su última medición
routerGrafico.get('/dia', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`FROM `tepelco` WHERE `fecha` BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() ORDER BY `fecha` ASC ", function(err, result, fields) {
          if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result); //Envío solo el primer elemento que vuelve de la BD
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
routerGrafico.get('/semana', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`FROM `tepelco` WHERE `fecha` BETWEEN DATE_SUB(NOW(), INTERVAL 168 HOUR) AND NOW() ORDER BY `fecha` ASC ", function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result); //Se envía todo el vector.
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
routerGrafico.get('/todos', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`FROM `tepelco` ORDER BY `fecha`ASC ", function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result); //Se envía todo el vector.
    });
});

module.exports = routerGrafico;         //comparto el routerDispositivo
