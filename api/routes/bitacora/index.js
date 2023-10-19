var express = require('express');                //importa package de express
var routerBitacora = express.Router();        //Defino el router "routerDispositivo"
var pool = require('../../mysql');               //importa package de mysql porque voy a usar funciones de ese package


//Devuelve el listado de dispositivos

routerBitacora.post('/post', (req, res) => { 
    console.log("/bitacora/post/" + JSON.stringify(req.body));
    try{
        const titulo=req.body.titulo;
        const contenido=req.body.contenido;
        const usuario=req.body.usuario;
        const idDis=req.body.idDis;
            pool.query('INSERT INTO bitacora(titulo, contenido, usuarioId, dispositivoId) values (?,?,?,?)', [titulo, contenido, usuario,idDis], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                console.log(err);
                return;
            }
            res.send(result); //Envío solo el primer elemento que vuelve de la BD
            
        });
    }
    catch{
        console.log("Parece que hubo bardo")
    }
});
routerBitacora.get('/get/:id/', (req, res) => {
  pool.query('SELECT * FROM bitacora WHERE dispositivoId=? ORDER BY `fecha` DESC ', [req.params.id], function(err, result, fields) {
      if (err) {
          res.send(err).status(400);
          return;
      }
      console.log(result);
      res.send(result);
  });
});
module.exports = routerBitacora;         //comparto el routerDispositivo
