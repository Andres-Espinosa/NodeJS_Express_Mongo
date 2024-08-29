const express = require('express')
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de CURSOS funcionando correctamente...');
});

module.exports = ruta;