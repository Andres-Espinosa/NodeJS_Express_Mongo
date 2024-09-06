const express = require('express');
const cursoController = require('../controllers/Cursos'); // Importa el controlador
const router = express.Router(); // Define el enrutador

// Listar todos los cursos activos
/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos los cursos activos
 *     tags:
 *       - Cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "66d05dddb025aa6e32e1654b"
 *                   titulo:
 *                     type: string
 *                     example: "Introducción a React.JS"
 *                   descripcion:
 *                     type: string
 *                     example: "Curso básico sobre React.JS"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/react.png"
 *                   alumnos:
 *                     type: number
 *                     example: 20
 *                   calificacion:
 *                     type: number
 *                     example: 4.7
 *       204:
 *         description: No hay cursos activos disponibles
 */

router.get('/', cursoController.listarCursosActivos);

// Obtener curso por ID
/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtiene un curso por su ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "66d05dddb025aa6e32e1654b"
 *                 titulo:
 *                   type: string
 *                   example: "Introducción a React.JS"
 *                 descripcion:
 *                   type: string
 *                   example: "Curso básico sobre React.JS"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/react.png"
 *                 alumnos:
 *                   type: number
 *                   example: 20
 *                 calificacion:
 *                   type: number
 *                   example: 4.7
 *       404:
 *         description: Curso no encontrado
 */

router.get('/:id', cursoController.obtenerCursoPorId);

// Obtener usuarios por curso
/**
 * @swagger
 * /cursos/{id}/usuarios:
 *   get:
 *     summary: Obtiene los usuarios asociados a un curso
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios asociados al curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "5f8d04b3b54764421b7156e4"
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *       404:
 *         description: No se encontraron usuarios para el curso
 */

router.get('/:id/usuarios', cursoController.obtenerUsuariosPorCurso);

// Crear un curso
/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags:
 *       - Cursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nuevo curso de Node.js"
 *               descripcion:
 *                 type: string
 *                 example: "Curso avanzado sobre Node.js"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/nodejs.png"
 *               alumnos:
 *                 type: number
 *                 example: 25
 *               calificacion:
 *                 type: number
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: El curso ya existe
 */

router.post('/', cursoController.crearCurso);

// Crear colección de cursos
/**
 * @swagger
 * /cursos/coleccion:
 *   post:
 *     summary: Crea una colección de cursos
 *     tags:
 *       - Cursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Curso de Vue.js"
 *                 descripcion:
 *                   type: string
 *                   example: "Curso intermedio sobre Vue.js"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/vuejs.png"
 *                 alumnos:
 *                   type: number
 *                   example: 30
 *                 calificacion:
 *                   type: number
 *                   example: 4.9
 *     responses:
 *       201:
 *         description: Cursos guardados exitosamente
 *       400:
 *         description: Error en los datos de uno o más cursos
 *       500:
 *         description: Error interno del servidor
 */

router.post('/coleccion', cursoController.guardarColeccionCursos);

// Actualizar curso
/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Actualiza un curso por su ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Actualización del curso de Node.js"
 *               descripcion:
 *                 type: string
 *                 example: "Contenido actualizado sobre Node.js"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/nodejs_updated.png"
 *               alumnos:
 *                 type: number
 *                 example: 30
 *               calificacion:
 *                 type: number
 *                 example: 4.6
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put('/:id', cursoController.actualizarCurso);

// Eliminar (desactivar) un curso
/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Desactiva un curso por su ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso a desactivar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso desactivado exitosamente
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', cursoController.desactivarCurso);

module.exports = router;
