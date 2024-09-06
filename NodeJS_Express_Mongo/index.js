const express = require('express');
const mongoose = require('mongoose');
const { swaggerUi, swaggerSpec } = require('./swagger/Swagger'); // Importa Swagger

// Importar rutas
const cursosRoutes = require('./routes/cursos_routes');
const usuariosRoutes = require('./routes/usuarios_routes');

// Importar la función de semillas
const seedDatabase = require('./seed/seeds');

// Crear la aplicación Express
const app = express();

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb+srv://amdresesp21:kd1VuQUUtE5ilB37@labnode.rs49c.mongodb.net/?retryWrites=true&w=majority&appName=LabNode')
    .then(async () => {
        console.log('Conectado a MongoDB');

        // Ejecutar la siembra de la base de datos
        await seedDatabase();

        // Middleware
        app.use(express.json()); // Middleware para parsear JSON
        app.use(express.urlencoded({ extended: true }));

        // Rutas de la aplicación
        app.use('/api/cursos', cursosRoutes);
        app.use('/api/usuarios', usuariosRoutes);

        // Manejo de errores
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
        });

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));