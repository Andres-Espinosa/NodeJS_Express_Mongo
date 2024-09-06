const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Cursos y Usuarios',
        version: '1.0.0',
        description: 'Documentación de la API para la gestión de cursos y usuarios',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Cambia esto por la URL de tu servidor
            description: 'Servidor de desarrollo',
        },
    ],
    tags: [
        {
            name: 'Cursos',
            description: 'Operaciones relacionadas con los cursos'
        },
        {
            name: 'Usuarios',
            description: 'Operaciones relacionadas con los usuarios'
        },
        // Puedes definir otros tags aquí si tienes más grupos de endpoints
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Ruta a los archivos que contienen anotaciones de Swagger
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = {
    swaggerUi,
    swaggerSpec,
};