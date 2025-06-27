const modeloReceta= {
    nombre: "",
    descripcion: "",
    ingredientes: [],
    pasos: [],
    imagen: ""
};

function guardarReceta(receta){
    var recetas= JSON.parse(localStorage.getItem('recetas')) || [];
    recetas.push(receta);
    localStorage.setItem('recetas', JSON.stringify(recetas));
}