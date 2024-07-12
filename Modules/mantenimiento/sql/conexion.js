let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost", //cambiar todo dependiendo de la base de datos que se use
    database: "restaurante",
    user: "root",
    password: ""
});

conexion.connect(function(err){
    if(err){
        throw err;
    }
    else{
        console.log("conexion exitosa");
    }
});

module.exports = conexion;