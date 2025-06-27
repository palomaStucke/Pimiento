// Agrega un usuario si no existe email o usuario repetido
function agregarUsuario(nuevoUsuario) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.email === nuevoUsuario.email || u.usuario === nuevoUsuario.usuario)) {
        return false; // Ya existe
    }
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return true;
}

// Busca usuario por email y contraseña (para login)
function buscarUsuario(email, contrasenia) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(u => u.email === email && u.contrasenia === contrasenia) || null;
}

// Busca usuario por email o usuario (para validación de registro)
function existeUsuario(email, usuario) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(u => u.email === email || u.usuario === usuario);
}

// Obtiene todos los usuarios
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}