const express = require('express')
const Curso = require('../models/curso_model');
const ruta = express.Router();


ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de CURSOS funcionando correctamente...');
});

//Funcion asincrona para crear cursos
async function crearCurso(body) {
    let curso = new Curso({
        titulo          : body.titulo,
        descripcion     : body.descripcion,
        alumnos         : body.alumnos,
        calificacion    : body.calificacion
    });
    return await curso.save();    
}

//Funcion de tipo POST para el recurso CURSOS
ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

//Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo      : body.titulo,
            descripcion : body.descripcion
        }
    }, {new: true});
    return curso;
}

//Endpoint de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).jason(err)
    })
})

//Funcion asincrona para inactivar cursos
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return curso;
}

//Endpoint de tipo DELETE para el recurso CURSOS
ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})

module.exports = ruta;