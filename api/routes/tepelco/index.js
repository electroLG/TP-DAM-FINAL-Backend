var express = require('express');                //importa package de express
var routerTepelco = express.Router();           //Defino el router "routerLogRiego"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package

//Espera recibir en el body, fecha, apertura y electrovalvulaId para insertar un log de riego.
routerTepelco.post('/', function(req, res) {
  pool.query("INSERT INTO `tepelco` (`dp_cartucho`,`dp_filtro`,`ciclo_ev1`,`ciclo_ev2`,`ciclo_ev3`,`ciclo_ev4`,`ciclo_ev5`,`ciclo_ev6`,`ciclo_ev7`,`ciclo_ev8`) VALUES(?,?,?,?,?,?,?,?,?,?)",
  [req.body.dp_cartucho,req.body.dp_filtro,req.body.ciclo_ev1,req.body.ciclo_ev2,req.body.ciclo_ev3,req.body.ciclo_ev4,req.body.ciclo_ev5,req.body.ciclo_ev6,req.body.ciclo_ev7,req.body.ciclo_ev8], function(err, result, fields) {
      if (err) {
          res.send(err).status(400);
          return;
      }
      res.send("new_ok");
  });
  console.log("Llegue al servidor para agregar datos al tepelco");
  console.log(req.body);
});

module.exports = routerTepelco;         //comparto el routerTepelco


//=======[ Endpoint /tepelco-> Envío datos de item a modificar]==================
// app.post("/tepelco",function(req,res){
//     console.log("Llegue al servidor para agregar datos al tepelco")
//     console.log(Object.keys(req.params).length)
//     let dp_cartucho=req.body.dp_cartucho;
//     let dp_filtro=req.body.dp_filtro;
//     let ciclo_ev1=req.body.ciclo_ev1;
//     let ciclo_ev2=req.body.ciclo_ev2;
//     let ciclo_ev3=req.body.ciclo_ev3;
//     let ciclo_ev4=req.body.ciclo_ev4;
//     let ciclo_ev5=req.body.ciclo_ev5;
//     let ciclo_ev6=req.body.ciclo_ev6;
//     let ciclo_ev7=req.body.ciclo_ev7;
//     let ciclo_ev8=req.body.ciclo_ev8;
 

//     utils.query("INSERT INTO `tepelco` (`dp_cartucho`,`dp_filtro`,`ciclo_ev1`,`ciclo_ev2`,`ciclo_ev3`,`ciclo_ev4`,`ciclo_ev5`,`ciclo_ev6`,`ciclo_ev7`,`ciclo_ev8`) VALUES(?,?,?,?,?,?,?,?,?,?)",
//                                         [dp_cartucho,dp_filtro,ciclo_ev1,ciclo_ev2,ciclo_ev3,ciclo_ev4,ciclo_ev5,ciclo_ev6,ciclo_ev7,ciclo_ev8],
//                                         function(err,respuesta){
//         if (err)
//         {
//             res.send(err).status(400);
//             return;
//         }
//     /*data.push(req.body);*/
//     ;


//     res.send("new_ok");
//     });
// });
