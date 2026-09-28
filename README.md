# Servicio Web de Registro e Inicio de Sesión

**Evidencia:** GA7-220501096-AA5-EV01  
**Tecnología:** Node.js + Express  
**Versión:** 1.0.0

## Descripción
API REST académica para registrar usuarios y validar credenciales mediante inicio de sesión.

> Nota: los usuarios se almacenan temporalmente en memoria. En producción se debe usar una base de datos y almacenar contraseñas mediante hash seguro.

## Requisitos
- Node.js (LTS recomendado)
- npm
- Visual Studio Code
- Git
- Postman, Thunder Client o Insomnia

## Instalación
En la carpeta del proyecto:

```bash
npm install
```

## Ejecución

```bash
npm start
```

Servidor: `http://localhost:3000`

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Comprueba que el servicio está activo |
| POST | `/api/register` | Registra un usuario |
| POST | `/api/login` | Valida las credenciales |

### Registro
POST `http://localhost:3000/api/register`

```json
{
  "usuario": "julian",
  "password": "123456"
}
```

Respuesta: `201 Created`

```json
{ "mensaje": "Usuario registrado correctamente" }
```

### Login correcto
POST `http://localhost:3000/api/login`

```json
{
  "usuario": "julian",
  "password": "123456"
}
```

Respuesta: `200 OK`

```json
{ "mensaje": "Autenticación satisfactoria" }
```

### Login incorrecto
```json
{
  "usuario": "julian",
  "password": "999999"
}
```

Respuesta: `401 Unauthorized`

```json
{ "error": "Error en la autenticación" }
```

### Validación
Si falta usuario o contraseña, la API responde `400 Bad Request`.

### Usuario duplicado
Si el usuario ya existe, la API responde `409 Conflict`.

## Git y GitHub

```bash
git init
git add .
git commit -m "feat: crear servicio web de registro y autenticacion"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/servicio-auth.git
git push -u origin main
```

Reemplaza `TU-USUARIO` por tu usuario real de GitHub.

Para futuros cambios:

```bash
git status
git add .
git commit -m "fix: ajustar validacion de autenticacion"
git push
```

## Evidencias recomendadas
1. Estructura del proyecto en Visual Studio Code.
2. Servidor ejecutándose con `npm start`.
3. Registro exitoso.
4. Inicio de sesión correcto.
5. Inicio de sesión incorrecto.
6. Repositorio publicado en GitHub.
7. Historial de commits.

## Seguridad para producción
- Usar una base de datos.
- Nunca almacenar contraseñas en texto plano.
- Usar bcrypt, Argon2 u otro hash apropiado.
- Usar variables de entorno para secretos.
- Usar HTTPS.
- Implementar sesiones o tokens según la arquitectura.
- Validar y sanitizar entradas.
- Controlar intentos repetidos de autenticación.

## Autor
Aprendiz: [Escribir nombre completo]  
Programa: [Escribir programa de formación]  
Ficha: [Escribir número de ficha]  
Evidencia: GA7-220501096-AA5-EV01
