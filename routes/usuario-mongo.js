const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario-mongo');

router.post('/mongo/insertarUsuario', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({ status: 'Usuario insertado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mongo/leerUsuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mongo/buscarUsuarioCedula/:cedula', async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const usuario = await Usuario.findOne({ cedulausuario: cedula });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/mongo/actualizarUsuario/:cedula', async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const data = req.body;
        await Usuario.findOneAndUpdate({ cedulausuario: cedula }, data);
        res.json({ status: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/mongo/eliminarUsuario/:cedula', async (req, res) => {
    try {
        const cedula = req.params.cedula;
        await Usuario.findOneAndDelete({ cedulausuario: cedula });
        res.json({ status: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualiza un usuario por su cedula y si no existe lo crea
router.put('/mongo/actualizarOCrearUsuario/:cedula', async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const data = req.body;
        await Usuario.findOneAndUpdate({ cedulausuario: cedula }, data, { upsert: true });
        res.json({ status: 'Usuario actualizado o creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/mongo/filtrarUsuarios', async (req, res) => {
    try {
        const { campo, valor } = req.query;
        let query = {};

        if (campo && valor) {
            if (campo === 'todos') {
                // Búsqueda en todos los campos
                query = {
                    $or: [
                        { nombreusuario: { $regex: valor, $options: 'i' } },
                        { cedulausuario: { $regex: valor, $options: 'i' } },
                        { telefonousuario: { $regex: valor, $options: 'i' } },
                        { direccionusuario: { $regex: valor, $options: 'i' } },
                        { correousuario: { $regex: valor, $options: 'i' } }
                    ]
                };
            } else {
                // Búsqueda en un campo específico
                query[campo] = { $regex: valor, $options: 'i' };
            }
        }

        const usuarios = await Usuario.find(query);
        res.json(usuarios);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para búsqueda avanzada con múltiples criterios
router.post('/mongo/busquedaAvanzada', async (req, res) => {
    try {
        const criterios = req.body;
        let query = {};

        // Construir query dinámica basada en los criterios recibidos
        if (Object.keys(criterios).length > 0) {
            query = {
                $and: Object.entries(criterios).map(([campo, valor]) => {
                    if (valor && valor.toString().trim()) {
                        return { [campo]: { $regex: valor.toString().trim(), $options: 'i' } };
                    }
                }).filter(Boolean)
            };
        }

        const usuarios = await Usuario.find(query)
            .sort({ nombreusuario: 1 }); // Ordenar por nombre

        res.json(usuarios);
    } catch (error) {
        console.error('Error en la búsqueda avanzada:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;