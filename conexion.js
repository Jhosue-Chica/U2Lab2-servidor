var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bdd_webservice'
});

console.log('Pool de conexiones creado');

var getConnection = function (callback) {
    console.log('Obteniendo conexión del pool');
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return callback(err);
        }
        console.log('Conexión obtenida');
        callback(null, connection);
    });
}

module.exports = getConnection;