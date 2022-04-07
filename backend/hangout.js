// // mysql connection
// var pool = mysql.createPool({
//   host: process.env.MYSQL_CLOUD_HOST,
//   user: process.env.MYSQL_CLOUD_USER,
//   password: process.env.MYSQL_CLOUD_PASS,
//   port: process.env.MYSQL_PORT,
//   database: process.env.MYSQL_DB
// });

// module.exports = pool;

const mysql = require('mysql');

// const dbSocketAddr = process.env.DB_HOST.split(':');

// var pool = mysql.createPool({
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     host: dbSocketAddr[0], // e.g. '127.0.0.1'
//     port: dbSocketAddr[1], // e.g. '3306'
//   });

const createUnixSocketPool = async () => {
  const dbSocketPath = '/cloudsql';

  // Establish a connection to the database
  return mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
  });
};

module.exports = createUnixSocketPool;