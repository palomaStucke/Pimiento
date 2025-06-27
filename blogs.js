// Modelo de publicación de blog
const modeloPublicacion = {
    usuario: "",      // nombre de usuario
    fechaHora: "",    // fecha y hora de publicación (string)
    contenido: ""     // texto de la publicación
};

// Función para agregar una publicación
function agregarPublicacion(usuario, contenido) {
    const fechaHora = new Date().toLocaleString();
    const nuevaPublicacion = {
        usuario,
        fechaHora,
        contenido
    };
    let publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];
    publicaciones.push(nuevaPublicacion);
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}