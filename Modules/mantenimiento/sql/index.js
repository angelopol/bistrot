const express = require('express');
const app = express();
const conexion = require("./conexion.js")

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
    res.send('Node JS API');
});

app.get('/api/mantenimientos_realizar', (req, res)=>{
    conexion.query('SELECT * FROM mantenimientos_realizar', function (error, results, fields) {
        res.send(results);
    });
});

app.get('/api/mantenimientos_realizar/:id', (req, res)=>{
    conexion.query('SELECT * FROM mantenimientos_realizar WHERE id = ?', [req.params.id],  function (error, results, fields) {
        if (results.length == 0) {
            res.status(404).send('ID no existe');
        } else {
            res.send(results);
        }
    });      
});

app.post('/api/mantenimientos_realizar', (req, res)=>{
    conexion.query('INSERT INTO mantenimientos_realizar (descripcion_corta,responsable,fecha_inicio,fecha_fin) VALUES (?,?,?,?)', [
        req.body.descripcion_corta,
        req.body.responsable,
        req.body.fecha_inicio,
        req.body.fecha_fin,
    ], function (error, results, fields) {
        res.send(results);
    });   
});

app.delete('/api/mantenimientos_realizar/:id', (req, res)=>{
    conexion.query('DELETE FROM mantenimientos_realizar WHERE id = ?', [
        req.params.id
    ], function (error, results, fields) {
        res.send(results);
    });   
});

app.get('/api/contactos', (req, res)=>{
    conexion.query('SELECT * FROM contactos', function (error, results, fields) {
        res.send(results);
    });
});

app.get('/api/contactos/:id', (req, res)=>{
    conexion.query('SELECT * FROM contactos WHERE id = ?', [req.params.id],  function (error, results, fields) {
        if (results.length == 0) {
            res.status(404).send('ID no existe');
        } else {
            res.send(results);
        }
    });      
});

app.post('/api/contactos', (req, res)=>{
    conexion.query('INSERT INTO contactos (nombre,servicio,telefono,correo) VALUES (?,?,?,?)', [
        req.body.nombre,
        req.body.servicio,
        req.body.telefono,
        req.body.correo,
    ], function (error, results, fields) {
        res.send(results);
    });   
});

app.delete('/api/contactos/:id', (req, res)=>{
    conexion.query('DELETE FROM contactos WHERE id = ?', [
        req.params.id
    ], function (error, results, fields) {
        res.send(results);
    });   
});

const port = 3306;
app.listen(port);
