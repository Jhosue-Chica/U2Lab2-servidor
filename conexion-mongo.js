const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bdd_webservice', {
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log('Error de conexión:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión MongoDB:'));
db.once('open', () => console.log('Conectado a MongoDB'));

module.exports = mongoose;