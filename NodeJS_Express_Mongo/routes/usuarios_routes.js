const express = require('express');
const usuarioController = require('../controllers/usuarios'); // Importa los controladores
const router = express.Router();

// Listar usuarios activos
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos los usuarios activos
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d1f0f55c8c3d2b5f8b4567"
 *                   nombre:
 *                     type: string
 *                     example: "Ana Martínez"
 *                   email:
 *                     type: string
 *                     example: "ana.martinez@example.com"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *       204:
 *         description: No hay usuarios activos disponibles
 */
router.get('/', usuarioController.listarUsuarioActivos);

// Listar cursos del usuario
/**
 * @swagger
 * /usuarios/{usuarioId}/cursos:
 *   get:
 *     summary: Lista los cursos asociados a un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de cursos asociados al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a75"
 *                   titulo:
 *                     type: string
 *                     example: "Introducción a Node.js"
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:usuarioId/cursos', usuarioController.listarCursosDeUsuario);

// Crear un usuario
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Maria López"
 *               email:
 *                 type: string
 *                 example: "maria.lopez@example.com"
 *               password:
 *                 type: string
 *                 example: "password456"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/maria_lopez.jpg"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: El usuario ya existe
 */

router.post('/', usuarioController.crearUsuario);

//Agrega cursos a un usuario
/**
 * @swagger
 * /usuarios/{email}/cursos:
 *   post:
 *     summary: Agrega cursos a un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *               example: "60d1f0f55c8c3d2b5f8b4567"
 *     responses:
 *       200:
 *         description: Cursos agregados exitosamente al usuario
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/:email/cursos', usuarioController.agregarCursosAUsuario);

//Guardar una coleccion de usuarios
/**
 * @swagger
 * /usuarios/coleccion:
 *   post:
 *     summary: Crea una colección de usuarios
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - email
 *                 - nombre
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "maria.lopez@example.com"
 *                   description: "Correo electrónico válido del usuario."
 *                 nombre:
 *                   type: string
 *                   example: "Maria López"
 *                   description: "Nombre del usuario."
 *                 password:
 *                   type: string
 *                   example: "password456"
 *                   description: "Contraseña del usuario, debe tener entre 6 y 30 caracteres."
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                   description: "Estado activo o inactivo del usuario."
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/maria_lopez.jpg"
 *                   description: "URL de la imagen del usuario (opcional)."
 *     responses:
 *       201:
 *         description: Usuarios guardados exitosamente
 *       400:
 *         description: Error en los datos de uno o más usuarios
 *       500:
 *         description: Error interno del servidor
 */

router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

// Actualizar un usuario
/**
 * @swagger
 * /usuarios/{email}:
 *   put:
 *     summary: Actualiza un usuario por su email
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Laura Gómez"
 *               password:
 *                 type: string
 *                 example: "newpassword456"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/laura_gomez.jpg"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:email', usuarioController.actualizarUsuario);


// Eliminar usuario
/**
 * @swagger
 * /usuarios/{email}:
 *   delete:
 *     summary: Desactiva un usuario por su email
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario a desactivar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:email', usuarioController.desactivarUsuario);

module.exports = router;
