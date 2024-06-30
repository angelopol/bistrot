let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "127.0.0.1", //lo mismo que localhost
    database: "inventario",
    user: "root",
    password: "",
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database.');
});


module.exports = connection;

