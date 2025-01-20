const express = require('express');
const router = express.Router();
const getConnection = require('../conexion');

// Consultar usuario por cedula
router.get('/buscarUsuarioCedula/:cedula', (req, res) => {
    console.log('- - Petición recibida para buscar usuario por cédula:', req.params.cedula);
    
    getConnection((err, connection) => {
        if (err) {
            console.error('Error en la conexión a la base de datos:', err);
            return res.status(500).send('Error en la conexión a la base de datos');
        }

        console.log('Conexión a la base de datos establecida');
        
        const cedula = req.params.cedula;
        const queryString = "SELECT * FROM usuario WHERE cedulausuario = ?";
        
        connection.query(queryString, [cedula], (err, rows) => {
            connection.release(); 
            
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(400).send('No se pudo realizar la consulta');
            }

            console.log('Consulta realizada con éxito, filas obtenidas:', rows.length);
            res.json(rows);
        });
    });
});

module.exports = router;
