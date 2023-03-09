function validarcredenciales(username, password){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username === "mason" && password === "mason"){
        alert("Bienvenido al grupo de los masones.");
        alert("Porfavor, cuide la informacion de esta cuenta y no la comparta con nadie.");
        alert("La informacion que se encuentra en esta cuenta es muy importante para nosotros.");
        alert("Gracias por su comprension.");
        console.log("Bienvenido al grupo de los masones.");
        return true;
    } else {
        return false;
    }
    
}

module.exports = {validarcredenciales};

// Path: Lab13\public\js\index.js


