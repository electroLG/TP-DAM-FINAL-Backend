var express = require('express');
var app = express();
var PORT = 3000;
var i=0;
var routerDisp = require('./routes/dispositivo');           //ruteo dispositivo

var routerMed = require('./routes/medicion');               //ruteo medición

var routerLogR = require('./routes/logRiego');               //ruteo log de riegos

var routerTepelco = require('./routes/tepelco');   

var routerGrafico = require('./routes/graf');              //ruteo log de riegos

var cors = require('cors');                                 //Agrego cors para permitir acceso desde otros dispositivos


var corsOptions={origin:'*', optionsSucessStatus:200};

var logger = function(req,res,next) {
  console.log("Se realizó consulta a la api, es la nro = " + i);
  i++;
  next();
}

app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));

app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMed);

app.use('/api/logRiego', routerLogR);

app.use('/tepelco', routerTepelco);

app.use('/graf', routerGrafico);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});
