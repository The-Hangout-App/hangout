// // mysql connection
// var pool = mysql.createPool({
//   host: process.env.MYSQL_CLOUD_HOST,
//   user: process.env.MYSQL_CLOUD_USER,
//   password: process.env.MYSQL_CLOUD_PASS,
//   port: process.env.MYSQL_PORT,
//   database: process.env.MYSQL_DB
// });

// module.exports = pool;

const mysql = require('promise-mysql');
const fs = require('fs');

// const dbSocketAddr = process.env.DB_HOST.split(':');

// var pool = mysql.createPool({
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     host: dbSocketAddr[0], // e.g. '127.0.0.1'
//     port: dbSocketAddr[1], // e.g. '3306'
//   });

const createUnixSocketPool = async (config) => {
  const dbSocketPath = '/cloudsql';

  // Establish a connection to the database
  return mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
    // ssl: {
    //   //sslmode: 'verify-full',
    //   ca: fs.readFileSync(process.env.DB_ROOT_CERT), // e.g., '/path/to/my/server-ca.pem'
    //   key: fs.readFileSync(process.env.DB_KEY), // e.g. '/path/to/my/client-key.pem'
    //   cert: fs.readFileSync(process.env.DB_CERT), // e.g. '/path/to/my/client-cert.pem'
    // },
    ...config
  });
};

const createPool = async () => {
  const config = {
    // [START cloud_sql_mysql_mysql_limit]
    // 'connectionLimit' is the maximum number of connections the pool is allowed
    // to keep at once.
    connectionLimit: 5,
    // [END cloud_sql_mysql_mysql_limit]

    // [START cloud_sql_mysql_mysql_timeout]
    // 'connectTimeout' is the maximum number of milliseconds before a timeout
    // occurs during the initial connection to the database.
    connectTimeout: 10000, // 10 seconds
    // 'acquireTimeout' is the maximum number of milliseconds to wait when
    // checking out a connection from the pool before a timeout error occurs.
    acquireTimeout: 10000, // 10 seconds
    // 'waitForConnections' determines the pool's action when no connections are
    // free. If true, the request will queued and a connection will be presented
    // when ready. If false, the pool will call back with an error.
    waitForConnections: true, // Default: true
    // 'queueLimit' is the maximum number of requests for connections the pool
    // will queue at once before returning an error. If 0, there is no limit.
    queueLimit: 0, // Default: 0
    // [END cloud_sql_mysql_mysql_timeout]

    // [START cloud_sql_mysql_mysql_backoff]
    // The mysql module automatically uses exponential delays between failed
    // connection attempts.
    // [END cloud_sql_mysql_mysql_backoff]
  };
  return createUnixSocketPool(config);
};

module.exports = createPool;