const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos')

const express = require('express'); 
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://amdresesp21:kd1VuQUUtE5ilB37@labnode.rs49c.mongodb.net/?retryWrites=true&w=majority&appName=LabNode')
  .then(() => console.log('Conectado a MongoDB.. ')) 
  .catch(err => console.log('No se pudo conectar con MongoDB..', err));

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//end points (recursos)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Api REST Ok, y ejecutándose...');
});
