// JS con la funcion validarcredenciales(), obtendra los valores ingresados por el usuario y los comparará con el conjunto predeterminado de credenciales

function validarcredenciales(){
    var nombre_usr = document.getElementById("nombre").value;
    var pass_usr = document.getElementById("password").value;

    if(nombre_usr === "admin" && pass_usr === "1234"){
        window.location.href = "home.html";
        alert("Bienvenido al grupo de los masones.");
        alert("Porfavor, cuide la informacion de esta cuenta y no la comparta con nadie.");
        alert("La informacion que se encuentra en esta cuenta es muy importante para nosotros.");
        alert("Gracias por su comprension.");

    } else {
        alert("Credenciales invalidas.");
    }
}
