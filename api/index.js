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

const helmet = require('helmet');                       //Securiza la aplicaciòn express, previniendo distintos ataques

var corsOptions={origin:'*', optionsSucessStatus:200};

var logger = function(req,res,next) {
  console.log("Se realizó consulta a la api, es la nro = " + i);
  i++;
  next();
}

app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));

app.use(helmet.xssFilter());                      //disables browsers' buggy cross-site scripting filter by setting the X-XSS-Protection header to 0
app.use(helmet.noSniff());                        //This mitigates MIME type sniffing which can cause security vulnerabilities
app.use(helmet.hidePoweredBy());                  //remueve el encabezado PoweredBy del encabezado HTTP
app.use(helmet.frameguard({ action: "deny" }));   //sets the X-Frame-Options header to help you mitigate clickjacking attacks.

app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMed);

app.use('/api/logRiego', routerLogR);

app.use('/tepelco', routerTepelco);

app.use('/graf', routerGrafico);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});
