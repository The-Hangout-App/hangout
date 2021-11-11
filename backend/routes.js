const pool = require('./hangout')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

app.post('/user/create', (req, res) => {
  console.log(req.body.user_id , req.body.username,req.body.password,req.body.first_name,req.body.last_name,req.body.pronoun,req.body.age,req.body.gender,req.body.bio);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
      if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          var user_id = req.body.user_id 
          var username = req.body.username
          var password = req.body.password
          var first_name = req.body.first_name
          var last_name = req.body.last_name
          var pronoun = req.body.pronoun
          var age = req.body.age
          var gender = req.body.gender
          var bio = req.body.bio
          // if there is no issue obtaining a connection, execute query
          connection.query('INSERT INTO users (user_id, username, password, first_name, last_name, pronoun, age, gender, bio) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',[user_id, username, password, first_name, last_name, pronoun, age, gender, bio], function (err, rows, fields) {
              if (err) { 
                  // if there is an error with the query, release the connection instance and log the error
                  connection.release()
                  logger.error("Error while creating user: \n", err); 
                  res.status(400).json({
                      "data": [],
                      "error": "MySQL error"
                  })
              } else{
                  res.status(200).json({
                      "data": rows
                  });
              }
          });
      }
  });
});

//BRIGITTA - FROM HERE ON
  // given a username, return a user 
  app.get('/user/:username', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var username = req.param('username');
        connection.query("SELECT * FROM users WHERE username = ?", username, function (err, result, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(result)); // Result in JSON format
            // res.status(200).json({
            //   "data": rows
            // });
          }
        });
      }
    });
  });
    
  //given a username and password, return a user
  app.get('/user/:username/:password', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var username = req.param('username');
        var password = req.param('password');
        connection.query(`SELECT * FROM users WHERE username = ? && password = ?`, [username, password], function (err, result, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(result)); // Result in JSON format
            // res.status(200).json({
            //   "data": rows
            // });
          }
        });
      }
    });
  });

  //return an array of cards
  app.get('/cards', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM cards`, function (err, result, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(result)); // Result in JSON format
            // res.status(200).json({
            //   "data": rows
            // });
          }
        });
      }
    });
  });

  //given an activity category id, return an array of cards
  app.get('/cards/:activity_category_id', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var activity_type_id = req.param('activity_type_id');
        connection.query(`SELECT * FROM cards WHERE activity_type_id = ?`, activity_type_id, function (err, result, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(result)); // Result in JSON format
            // res.status(200).json({
            //   "data": rows
            // });
          }
        });
      }
    });
  });
    app.get('/chat/:chat_id', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          var chat_id = req.param('chat_id');
          connection.query("SELECT * FROM chat WHERE chat_id = ?", chat_id, function (err, result, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.end(JSON.stringify(result)); // Result in JSON format
              // res.status(200).json({
              //   "data": rows
              // });
            }
          });
        }
      });
    });

    app.get('/chatmembers/:chat_id', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          var chat_id = req.param('chat_id');
          connection.query("SELECT * FROM chat_members WHERE chat_id = ?", chat_id, function (err, result, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.end(JSON.stringify(result)); // Result in JSON format
              // res.status(200).json({
              //   "data": rows
              // });
            }
          });
        }
      });
    });

    app.get('/messages/:chat_id', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          var chat_id = req.param('chat_id');
          connection.query("SELECT * FROM messages WHERE chat_id = ?", chat_id, function (err, result, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "data": [],
                "error": "Error obtaining values"
              })
            } else {
              res.end(JSON.stringify(result)); // Result in JSON format
              // res.status(200).json({
              //   "data": rows
              // });
            }
          });
        }
      });
    });

    app.post('/user/register', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
          if(err){
              // if there is an issue obtaining a connection, release the connection instance and log the error
              logger.error('Problem obtaining MySQL connection',err)
              res.status(400).send('Problem obtaining MySQL connection'); 
          } else {

              var username = req.body.username
              var password = req.body.password
  

              // if there is no issue obtaining a connection, execute query
              connection.query('INSERT INTO users (username, password) VALUES(?, ?)',[username, password], function (err, rows, fields) {
                  if (err) { 
                      // if there is an error with the query, release the connection instance and log the error
                      connection.release()
                      logger.error("Error while creating user: \n", err); 
                      res.status(400).json({
                          "data": [],
                          "error": "MySQL error"
                      })
                  } else{
                      res.status(200).json({
                          "data": rows
                      });
                  }
              });
          }
      });
    });
    

  }

