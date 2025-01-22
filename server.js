const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(require('./routes/usuario'));

// Cabeceras CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
