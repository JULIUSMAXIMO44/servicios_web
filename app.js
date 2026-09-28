// ======================================================
// SERVICIO WEB DE REGISTRO E INICIO DE SESIÓN
// Evidencia: GA7-220501096-AA5-EV01
// Tecnología: Node.js + Express
// Autor: Julio César Rudas Sánchez
// ======================================================
const express = require("express");
const app = express();
const PORT = 3000;

// Permite recibir información en formato JSON.
app.use(express.json());

// Almacenamiento temporal para fines académicos.
// En producción debe usarse una base de datos y hash seguro.
const usuarios = [];

// Comprueba que el servicio está funcionando.
app.get("/", (req, res) => {
    res.status(200).json({ mensaje: "Servicio web funcionando correctamente" });
});

// Registro de usuario.
app.post("/api/register", (req, res) => {
    const { usuario, password } = req.body;

    // Validamos los campos obligatorios.
    if (!usuario || !password) {
        return res.status(400).json({ error: "El usuario y la contraseña son obligatorios" });
    }

    // Verificamos si el usuario ya existe.
    const usuarioExistente = usuarios.find((user) => user.usuario === usuario);
    if (usuarioExistente) {
        return res.status(409).json({ error: "El usuario ya está registrado" });
    }

    // Guardamos el usuario temporalmente en memoria.
    usuarios.push({ usuario, password });

    return res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});

// ------------------------------------------------------
// CONSULTAR USUARIOS REGISTRADOS
// ------------------------------------------------------
// Método: GET
// URL: http://localhost:3000/api/usuarios
// ------------------------------------------------------

app.get("/api/usuarios", (req, res) => {

    // Devolvemos únicamente los nombres de usuario.
    // No mostramos las contraseñas por seguridad.
    const listaUsuarios = usuarios.map((user) => ({
        usuario: user.usuario
    }));

    res.status(200).json({
        usuarios: listaUsuarios
    });
});

// Inicio de sesión.
app.post("/api/login", (req, res) => {
    const { usuario, password } = req.body;

    // Validamos los datos recibidos.
    if (!usuario || !password) {
        return res.status(400).json({ error: "El usuario y la contraseña son obligatorios" });
    }

    // Buscamos coincidencia entre usuario y contraseña.
    const usuarioEncontrado = usuarios.find(
        (user) => user.usuario === usuario && user.password === password
    );

    // Si no hay coincidencia, rechazamos la autenticación.
    if (!usuarioEncontrado) {
        return res.status(401).json({ error: "Error en la autenticación" });
    }

    return res.status(200).json({ mensaje: "Autenticación satisfactoria" });
});

// Iniciamos el servidor.
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
