const logic = require('../logic/usuario_logic');
const { usuarioSchemaValidation } = require('../validaciones/usuarios_validations');

// Controlador para listar los usuarios activos
const listarUsuarioActivos = async (req, res) => {
    try {
        const usuarios = await logic.listarUsuarioActivos();
        if (usuarios.length === 0) {
            return res.status(204).send(); // No Content
        }
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { error, value } = usuarioSchemaValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const nuevoUsuario = await logic.crearUsuario(value);
        res.status(201).json({ usuario: nuevoUsuario }); // 201 Created
    } catch (err) {
        if (err.message === 'El correo electrónico ya está registrado') {
            return res.status(409).json({ error: err.message }); // 409 Conflict
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const actualizarUsuario = async (req, res) => {
    const { email } = req.params;

    // Verificar que el email esté presente en los parámetros
    if (!email) {
        return res.status(400).json({ error: 'El correo electrónico es un campo requerido' });
    }

    // Validar el cuerpo de la solicitud, excluyendo 'email'
    const { error, value } = usuarioSchemaValidation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }

    // Asegúrate de que el email no se esté intentando actualizar
    if (value.email) {
        return res.status(400).json({ error: 'El correo electrónico no puede ser modificado' });
    }

    try {
        // Actualiza el usuario, usando el email como identificador
        const usuarioActualizado = await logic.actualizarUsuario(email, value);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ usuario: usuarioActualizado });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};


// Controlador para desactivar un usuario
const desactivarUsuario = async (req, res) => {
    const { email } = req.params;
    try {
        const usuarioDesactivado = await logic.desactivarUsuario(email);
        if (!usuarioDesactivado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ usuario: usuarioDesactivado });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para agregar cursos al usuario
const agregarCursosAUsuario = async (req, res) => {
    const { email } = req.params;
    const cursos = req.body; // Asegúrate de que cursos esté directamente en req.body

    // Verificar que cursos es un array de strings
    if (!Array.isArray(cursos) || cursos.some(cursoId => typeof cursoId !== 'string')) {
        return res.status(400).json({ error: 'Se requiere un array de IDs de cursos como strings' });
    }

    try {
        const usuarioActualizado = await logic.agregarCursosAUsuario(email, cursos);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Controlador para listar los cursos de un usuario
const listarCursosDeUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const cursos = await logic.listarCursosDeUsuario(usuarioId);
        if (cursos.length === 0) {
            return res.status(204).send(); // No Content
        }
        res.json(cursos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para guardar una colección de usuarios
const guardarColeccionUsuarios = async (req, res) => {
    const usuarios = req.body; // Se espera que el cuerpo de la solicitud contenga un array de usuarios
    // Validar y filtrar usuarios para evitar duplicados por correo electrónico
    const emailsUnicos = new Set(); // Usamos un Set para almacenar correos únicos
    const usuariosValidos = [];
    for (let usuario of usuarios) {
        const { error } = usuarioSchemaValidation.validate(usuario);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // Verificar si el correo ya fue encontrado en la colección
        if (emailsUnicos.has(usuario.email)) {
            continue; // Si ya existe, lo omitimos para evitar duplicados en la colección
        }
        // Agregar el correo al Set y el usuario al array de usuarios válidos
        emailsUnicos.add(usuario.email);
        usuariosValidos.push(usuario);
    }
    try {
        const resultados = await logic.guardarColeccionUsuarios(usuariosValidos); // Llama a la función lógica
        res.status(201).json(resultados); // Responde con los usuarios guardados
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor al guardar la colección de usuarios' });
    }
};

// Exportar los controladores
module.exports = {
    listarUsuarioActivos,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    agregarCursosAUsuario,
    listarCursosDeUsuario,
    guardarColeccionUsuarios
};
