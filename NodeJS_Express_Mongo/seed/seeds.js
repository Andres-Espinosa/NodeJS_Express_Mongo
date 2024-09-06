const mongoose = require('mongoose');
const Curso = require('../models/curso_model');
const Usuario = require('../models/usuario_model');

const usuariosData = [

  {
    email: "maria.lopez@example.com",
    nombre: "Maria López",
    password: "password456",
    estado: true,
    imagen: "https://example.com/maria_lopez.jpg"
  },
  {
    email: "carlos.garcia@example.com",
    nombre: "Carlos García",
    password: "password789",
    estado: true,
    imagen: "https://example.com/carlos_garcia.jpg"
  },
  {
    email: "natalia.silva@example.com",
    nombre: "Natalia Silva",
    password: "password012",
    estado: true,
    imagen: "https://example.com/natalia_silva.jpg"
  },
  {
    email: "sergio.martinez@example.com",
    nombre: "Sergio Martínez",
    password: "password123",
    estado: true,
    imagen: "https://example.com/sergio_martinez.jpg"
  },
  {
    email: "camila.sanchez@example.com",
    nombre: "Camila Sánchez",
    password: "password456",
    estado: true,
    imagen: "https://example.com/camila_sanchez.jpg"
  },
  {
    email: "felipe.gutierrez@example.com",
    nombre: "Felipe Gutiérrez",
    password: "password789",
    estado: true,
    imagen: "https://example.com/felipe_gutierrez.jpg"
  }
];

const cursosData = [
  {
    titulo: "Introducción a React.JS",
    descripcion: "Curso básico sobre React.JS",
    estado: true,
    imagen: "https://example.com/react.png",
    alumnos: 26,
    calificacion: 4.7
  },
  {
    titulo: "Desarrollo Web con HTML y CSS",
    descripcion: "Curso completo sobre desarrollo web",
    estado: true,
    imagen: "https://example.com/html_css.png",
    alumnos: 25,
    calificacion: 4.8
  },
  {
    titulo: "Introducción a Java Básico",
    descripcion: "Curso introductorio al lenguaje de programación Java.",
    estado: true,
    imagen: "https://example.com/java_basico.png",
    alumnos: 32,
    calificacion: 4.5
  }
  // Puedes agregar más cursos aquí...
];

async function seedDatabase() {
  try {
    // Crear cursos si no existen
    for (const cursoData of cursosData) {
      const cursoExistente = await Curso.findOne({ titulo: cursoData.titulo });
      if (!cursoExistente) {
        await Curso.create(cursoData);
        console.log(`Curso "${cursoData.titulo}" creado.`);
      } else {
        console.log(`Curso "${cursoData.titulo}" ya existe.`);
      }
    }

    // Crear usuarios si no existen
    for (const usuarioData of usuariosData) {
      const usuarioExistente = await Usuario.findOne({ email: usuarioData.email });
      if (!usuarioExistente) {
        await Usuario.create(usuarioData);
        console.log(`Usuario "${usuarioData.email}" creado.`);
      } else {
        console.log(`Usuario "${usuarioData.email}" ya existe.`);
      }
    }

    console.log("Semillas completadas.");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
  }
}

module.exports = seedDatabase;