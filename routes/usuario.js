const express = require('express');
const router = express.Router();
const getConnection = require('../conexion');

// Consultar usuario por cedula
router.get('/buscarUsuarioCedula/:cedula', (req, res) => {
    console.log('');
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

// Insertar usuario
router.post('/insertarUsuario/', (req, res, next) => {
    console.log('');
    console.log('- - Petición recibida para insertar usuario:', req.body);
    const data = {
        nombreusuario: req.body.nombreusuario,
        cedulausuario: req.body.cedulausuario,
        telefonousuario: req.body.telefonousuario,
        direccionusuario: req.body.direccionusuario,
        correousuario: req.body.correousuario,
    }
    const query = "INSERT INTO usuario (nombreusuario, cedulausuario, telefonousuario, direccionusuario, correousuario) VALUES (?, ?, ?, ?, ?)";
    const params = [data.nombreusuario, data.cedulausuario, data.telefonousuario, data.direccionusuario, data.correousuario];

    getConnection(function (err, user) {
        if (err) {
            console.error('No se pudo realizar la conexión a la base de datos:', err);
        }
        user.query(query, params, function (err, result) {
            if (!err) {
                res.json({ status: 'Usuario insertado correctamente' });
            } else {
                console.error('Error en la consulta:', err);
            }
        });
    });
});

// Leer todos los usuarios
router.get('/leerUsuarios/', (req, res) => {
    console.log('');
    console.log('- - Petición recibida para leer todos los usuarios');

    getConnection((err, connection) => {
        if (err) {
            console.error('Error en la conexión a la base de datos:', err);
        }

        console.log('Conexión a la base de datos establecida');

        const queryString = "SELECT * FROM usuario";

        connection.query(queryString, (err, rows) => {
            connection.release();

            if (err) {
                console.error('Error en la consulta:', err);
            }

            console.log('Consulta realizada con éxito, filas obtenidas:', rows.length);
            res.json(rows);
        });
    });
});

// Actualizar usuario
router.put('/actualizarUsuario/:cedula', (req, res) => {
    console.log('');
    console.log('- - Petición recibida para actualizar usuario:', req.body);
    const data = {
        nombreusuario: req.body.nombreusuario,
        cedulausuario: req.body.cedulausuario,
        telefonousuario: req.body.telefonousuario,
        direccionusuario: req.body.direccionusuario,
        correousuario: req.body.correousuario,
    }
    const query = "UPDATE usuario SET nombreusuario = ?, cedulausuario = ?, telefonousuario = ?, direccionusuario = ?, correousuario = ? WHERE cedulausuario = ?";
    const params = [data.nombreusuario, data.cedulausuario, data.telefonousuario, data.direccionusuario, data.correousuario, req.params.cedula];

    getConnection(function (err, user) {
        if (err) {
            console.error('No se pudo realizar la conexión a la base de datos:', err);
        }
        user.query(query, params, function (err, result) {
            if (!err) {
                res.json({ status: 'Usuario actualizado correctamente' });
            } else {
                console.error('Error en la consulta:', err);
            }
        });
    });
});

// Eliminar usuario
router.delete('/eliminarUsuario/:cedula', (req, res) => {
    console.log('');
    console.log('- - Petición recibida para eliminar usuario:', req.params.cedula);

    getConnection((err, connection) => {
        if (err) {
            console.error('Error en la conexión a la base de datos:', err);
        }

        console.log('Conexión a la base de datos establecida');

        const cedula = req.params.cedula;
        const queryString = "DELETE FROM usuario WHERE cedulausuario = ?";

        connection.query(queryString, [cedula], (err, rows) => {
            connection.release();

            if (err) {
                console.error('Error en la consulta:', err);
            }

            console.log('Consulta realizada con éxito');
            res.json({ status: 'Usuario eliminado correctamente' });
        });
    });
});

module.exports = router;
