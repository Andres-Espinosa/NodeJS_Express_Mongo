const Joi = require('@hapi/joi');
const express = require('express');
const ruta = express.Router();
const logic = require('../logic/usuario_logic');

//Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios
ruta.get('/', (req,res)=>{
    let resultado = logic.listarUsuariosActivos();
    resultado.then(usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        )
    })
});

//Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    const {error, value} = logic.schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = logic.crearUsuario(body);

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});

//Endpoint de tipo PUT para actualizar los datos del usuario
ruta.put('/:email', (req, res) => {
    const {error, value} = Joi.object({
        nombre: Joi.string()
            .min(3)
            .max(30)
            .pattern(/^[A-Za-záéíóú ]{3,30}$/),
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
    }).validate(req.body);

    if(!error){
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({ valor });
        }).catch(err => {
            console.error('Error al actualizar usuario:', err);
            res.status(400).json({ err });
        });
    } else {
        console.error('Error de validación:', error);
        res.status(400).json({ error });
    }
});


//Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

module.exports = ruta;