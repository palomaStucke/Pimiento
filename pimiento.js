//Validacion login
function validarEmail(email){
    var valido=true; 

    if( email.indexOf("@") ===-1){
        valido=false;
    }
    
    var enPartes= email.split("@");
    if( enPartes.length != 2){
        valido=false;
    }
    var [usuario,dominio]=enPartes;
    if(usuario ==null || dominio==""){
        valido=false;
    }
    if(dominio==null || usuario==""){
        valido=false;
    }

    var dominioEnPartes= dominio.split(".");
    if(dominioEnPartes.length<2){
        valido=false;
    }
    if(dominioEnPartes.some(unaParte => !unaParte)){
        valido=false;
    }
    return valido;
}

function validarLogin(){
    var valido=true;
    var emailInput= document.getElementById("email");
    var email= emailInput.value.trim();
    var contraseniaInput= document.getElementById("contrasenia");
    var constrasenia= contraseniaInput.value.trim();

    const usuario= buscarUsuario(email,constrasenia);
    if(usuario){
        // Guarda el usuario logueado en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        window.location.href = "pimientoBlog.html";
        valido=false; //Evita el envio del formulario
    }else{
        valido=false;
        emailInput.style.border= "2px solid red" ;
        contraseniaInput.style.border= "2px solid red";
    }

    return valido;
}

function esDecimalEnRango(valor,min,max){
    var numero= Number(valor);
    var valido=true;

    if(!( Number.isFinite(numero) && !Number.isInteger(numero) && numero>=min && numero<=max)){
        valido=false;
    }
    return valido;
}
function validarRegistro(){
    var valido=true;
    
    // Limpia bordes previos
    ["nombre","usuario","emailRegistro","contraseniaRegistro","dia","mes","anio","nivelCocina","cantPlatosSem"].forEach(id=>{
        var el = document.getElementById(id);
        if(el) el.style.border = "";
    });

    var dia = parseInt(document.getElementById("dia").value, 10);
    var mes = parseInt(document.getElementById("mes").value, 10);
    var anio = parseInt(document.getElementById("anio").value, 10); 

    //valido que sean un numero entero positivo 
    if( isNaN(dia) || dia<1 || dia>31 ){
        valido=false;
        document.getElementById("dia").style.border= "2px solid red";
    }
    if( isNaN(mes) || mes<1 || mes>12 ){
        valido=false;
        document.getElementById("mes").style.border= "2px solid red";
    }
    if( isNaN(anio) || anio<1900 || anio> new Date().getFullYear() ){
        valido=false;
        document.getElementById("anio").style.border= "2px solid red";
    }

    //valido los dias maximos por mes
    var diasPorMes = [31, ( (anio%4==0 && anio%100!=0) || (anio%400==0) ) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mes >= 1 && mes <= 12 && dia > diasPorMes[mes-1]) {
        valido = false;
        document.getElementById("dia").style.border= "2px solid red";
        document.getElementById("mes").style.border= "2px solid red";
    }

    //verifico que los datos obligatorios no sean nulos o vacios
    var nombre=document.getElementById("nombreRegistro").value.trim();
    var usuario=document.getElementById("usuario").value.trim();
    var email=document.getElementById("emailRegistro").value.trim();
    var contrasenia=document.getElementById("contraseniaRegistro").value.trim();
    var nivel= document.getElementById("nivelCocina").value;
    var platos= document.getElementById("cantPlatosSem").value;
    var descripcionPerfil = document.getElementById("descripcionPerfil").value.trim();

    if(nombre==null || nombre==""){
        valido=false;
        document.getElementById("nombre").style.border= "2px solid red";
    }
    if(usuario==null || usuario==""){
        valido=false;
        document.getElementById("usuario").style.border= "2px solid red";
    }
    if(nivel==null || nivel=="" || !( esDecimalEnRango(nivel, 0.1, 0.9 ) ) ) {
        valido=false;
        document.getElementById("nivelCocina").style.border= "2px solid red";
    }
    if(platos==null || platos==""){
        valido=false;
        document.getElementById("cantPlatosSem").style.border= "2px solid red";
    }
    if(!validarEmail(email)){//funcion validarEmail declarada al inicio de este documento
        valido=false;
        document.getElementById("emailRegistro").style.border= "2px solid red";
    }

    if(valido){
        var nuevoUsuario= {
            nombre,
            usuario,
            email,
            contrasenia,
            dia,
            mes,
            anio,
            nivelCocina: nivel,
            cantPlatosSem: platos,
            descripcionPerfil
        };

        var usuarios= JSON.parse(localStorage.getItem('usuarios')) || [];
        // Verifica que no exista el email o usuario
        if(usuarios.some(u => u.email === email || u.usuario === usuario)){
            valido = false;
            alert("El email o usuario ya están registrados.");
            document.getElementById("emailRegistro").style.border= "2px solid red";
            document.getElementById("usuario").style.border= "2px solid red";
        } else {
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
            localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));
            console.log("Usuario registrado correctamente");
            window.location.href = "pimientoBlog.html";
            
        }
    }
    return valido;
}