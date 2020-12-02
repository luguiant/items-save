const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemsRoute = require("./routes/item.route");

const app = express();

// CABECERAS
app.use(cors({
    "origin": "*",
    "method": [
        'GET',
        'POST',
        'OPTIONS'
    ],
    "allowedHeaders": [
        'Authorization',
        'X-API-KEY',
        'Origin',
        'X-Requested-Width',
        'Content-Type',
        'Access-Control-Allow-Request-Method'
    ],
    "maxAge": 3600,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));

//  solo tomara en cuenta los objetos de tipo json
app.use(bodyParser.json());
//  no permitira objetos anidados
app.use(bodyParser.urlencoded({ extended: true }));

// RUTAS
console.log("0");
app.use('/api/items',itemsRoute);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


module.exports = app;
