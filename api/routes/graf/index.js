var express = require('express');                //importa package de express
var routerGrafico = express.Router();           //Defino el router "routerMedicion"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package

//Espera recibir por parámetro un id de dispositivo y devuelve su última medición
routerGrafico.get('/dia/:id', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`, `ciclo_ev1`, `ciclo_ev3`, `ciclo_ev5`, `ciclo_ev8`, `ciclo_ev2`, `ciclo_ev4` FROM `tepelco` WHERE `fecha` BETWEEN DATE_SUB(NOW(), INTERVAL 24 HOUR) AND NOW() AND `devId`= ?  ORDER BY `fecha` ASC ",[req.params.id], function(err, result, fields) {
          if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result); //Envío solo el primer elemento que vuelve de la BD
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
routerGrafico.get('/semana/:id', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`, `ciclo_ev1`, `ciclo_ev3`, `ciclo_ev5`, `ciclo_ev8`, `ciclo_ev2`, `ciclo_ev4` FROM `tepelco` WHERE `fecha` BETWEEN DATE_SUB(NOW(), INTERVAL 168 HOUR) AND NOW() AND `devId`= ? ORDER BY `fecha` ASC ",[req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result); //Se envía todo el vector.
    });
});
//Espera recibir por parámetro un id de dispositivo y devuelve su última medición
routerGrafico.get('/hs/:id', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`, `ciclo_ev1`, `ciclo_ev3`, `ciclo_ev5`, `ciclo_ev8`, `ciclo_ev2`, `ciclo_ev4` FROM `tepelco` WHERE `fecha` BETWEEN DATE_SUB(NOW(), INTERVAL 2 HOUR) AND NOW() AND `devId`= ?  ORDER BY `fecha` ASC ",[req.params.id], function(err, result, fields) {
          if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result); //Envío solo el primer elemento que vuelve de la BD
    });
});
//Espera recibir por parámetro un id de dispositivo y devuelve todas sus mediciones
routerGrafico.get('/todos/:id', function(req, res) {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`FROM `tepelco` WHERE `devId`= ? ORDER BY `fecha` ASC ",[req.params.id],function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result); //Se envía todo el vector.
    });
});



routerGrafico.get('/last/:id', function(req, res) {
    pool.query("SELECT * FROM `tepelco` WHERE `devId`= ? ORDER BY `fecha` DESC LIMIT 1", [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]); //Se envía todo el vector.
    });
});
//230823
routerGrafico.post('/intervalo/:id', (req, res) =>  {
    pool.query("SELECT `fecha`, `dp_cartucho`, `dp_filtro`, `ciclo_ev1`, `ciclo_ev3`, `ciclo_ev5`, `ciclo_ev8`, `ciclo_ev2`, `ciclo_ev4` FROM `tepelco` WHERE `devId`= ? AND `fecha` BETWEEN ? AND ? ORDER BY `fecha` ASC ",[req.params.id,req.body.inicio,req.body.fin],function(err, result, fields) {
        if (err) {
            console.log(req.body);
            res.send(err).status(400);
            return;
        }
        console.log(req.body);
        res.send(result); //Se envía todo el vector.
    });
});

module.exports = routerGrafico;         //comparto el routerDispositivo


