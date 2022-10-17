var mysql = require('mysql'); //importa el package para manejar SQL
var configMysql = {
    connectionLimit: 10,      // Límite de conexiones a aceptar
    host: 'mysql-server',
    port:  '3306',
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}
//  Límite de conexiones
//  SI no se usa la conexion la libera
//  SI no hay conexiones utilizadsa se crea una nueva
//  Si llegamos al límite de conexiones, se espera a que la conexión se libere.
//  Manejo eficiente de multiples conexiones a la base de datos.

// NO un Singleton, porque es una unica instancia, y la instancia queda en uso el tiempo que un usuario está conectado,
// por ende el tiempo de liberación de la conexión se eleva y no es concurrente

// Solamente utiliza SQL cuando quiero manejar plata y stock, JAJAJAJA.

var pool = mysql.createPool(configMysql);
pool.getConnection( (err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
        }
        if (connection) {
            connection.release();

        }
        return;
    }
});
module.exports = pool;        //comparto el routerMysql


