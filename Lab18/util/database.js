const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'pma',
    password: '',
    database: 'masones_log'
});

// Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error de MySQL: ', error);
        throw error;
    }
    console.log('Conexión a la base de datos establecida.');
});

// Manejador de errores para la conexión con la base de datos
connection.on('error', (err) => {
    console.error('Error de MySQL: ', err);
    throw err;
});

module.exports = connection;
