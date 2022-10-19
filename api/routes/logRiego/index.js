var express = require('express');                //importa package de express
var routerLogRiego = express.Router();           //Defino el router "routerLogRiego"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package

//Consulta de log  de riegos por electroválvula enviada como parámetro

routerLogRiego.get('/:id_ev/', function(req, res) {
    pool.query('SELECT * FROM Log_Riegos WHERE electrovalvulaId=?  ORDER BY fecha desc', [req.params.id_ev], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });

});

//Espera recibir por parámetro el id de la electroválvula para devolver su estado.
routerLogRiego.get('/:id_ev/estado', function(req, res) {
    pool.query('SELECT * FROM Log_Riegos WHERE electrovalvulaId=? ORDER BY fecha desc', [req.params.id_ev],function(err, result, fields) {
       if (err) {
           res.send(err).status(400);
           return;
       }
       res.send(result[0]);
   });
 
 });
//Espera recibir en el body, fecha, apertura y electrovalvulaId para insertar un log de riego.
routerLogRiego.post('/add', function(req, res) {
  pool.query('Insert into Log_Riegos (apertura, fecha, electrovalvulaId) values (?,?,?)', [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
      if (err) {
          res.send(err).status(400);
          return;
      }
      res.send(result);
  });
});

module.exports = routerLogRiego;         //comparto el routerLogRiego
