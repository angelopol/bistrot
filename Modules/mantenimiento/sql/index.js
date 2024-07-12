const express = require('express');
const app = express();
const conexion = require("./conexion.js")

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
    res.send('Node JS API');
});

app.get('/api/mantenimiento_documento_tecnico', (req, res)=>{
    conexion.query('SELECT * FROM mantenimiento_documento_tecnico', function (error, results, fields) {
        res.send(results);
    });
});

app.get('/api/mantenimiento_documento_tecnico/:id', (req, res)=>{
    conexion.query('SELECT * FROM mantenimiento_documento_tecnico WHERE id = ?', [req.params.id],  function (error, results, fields) {
        if (results.length == 0) {
            res.status(404).send('ID no existe');
        } else {
            res.send(results);
        }
    });      
});

app.post('/api/mantenimiento_documento_tecnico', (req, res)=>{
    conexion.query('INSERT INTO mantenimiento_documento_tecnico (nombre,tipo,objeto_inventario,descripcion,estatus) VALUES (?,?,?,?,?)', [
        req.body.nombre,
        req.body.tipo,
        req.body.objeto_inventario,
        req.body.descripcion,
        req.body.estatus
    ], function (error, results, fields) {
        res.send(results);
    });   
});

app.delete('/api/mantenimiento_documento_tecnico/:id', (req, res)=>{
    conexion.query('DELETE FROM mantenimiento_documento_tecnico WHERE id = ?', [
        req.params.id
    ], function (error, results, fields) {
        res.send(results);
    });   
});

const port = 8081;
app.listen(port);
