const mongoose = require('mongoose');
const conn = require('../conexion-mongo');

const usuarioSchema = new mongoose.Schema({
  nombreusuario: String,
  cedulausuario: String,
  telefonousuario: String,
  direccionusuario: String,
  correousuario: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);