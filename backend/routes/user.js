const { group } = require('console');
const { response } = require('express');
const pool = require('./hangout')

module.exports = function user(app, logger) {



    app.get('/getUserByID/:userID', (req, res) => {
        pool.getConnection(function (err, connection){
          if(err){
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
            var user_id = req.param('userID');
            connection.query("SELECT * FROM hangout.users WHERE user_id = ?", user_id, function (err, result, fields) {
              connection.release();
              if (err) {
                logger.error("Error while fetching values: \n", err);
                res.status(400).json({
                  "data": [],
                  "error": "Error obtaining values"
                })
              } else {
                res.end(JSON.stringify(result)); 
              }
            });
          }
        });
      });

      app.get('/users/:user_id/groups', (req, res) => {
        pool.getConnection(function (err, connection){
          if(err){
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
            var user_id = req.param('user_id');
            connection.query("Select cards.activity_name, hangout.groups.numMembers, hangout.groups.maxMembers from ((hangout.groups INNER JOIN cards on hangout.groups.card_id = cards.card_id) INNER JOIN users_in_groups ON users_in_groups.group_id = hangout.groups.group_id) where users_in_groups.user_id = ?;", user_id, function (err, result, fields) {
              connection.release();
              if (err) {
                logger.error("Error while fetching values: \n", err);
                res.status(400).json({
                  "data": [],
                  "error": "Error obtaining values"
                })
              } else {
                res.end(JSON.stringify(result)); 
              }
            });
          }
        });
      });

      app.get('/user/:userID/profile', (req, res) => {

        pool.getConnection(function (err, connection){
          if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
            // if there is no issue obtaining a connection, execute query and release connection
            var userID = req.param('userID');
            connection.query("SELECT * FROM users WHERE user_id = ?", userID, function (err, result, fields) {
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
              }
            });
          }
        });
      });

      app.get('/user/:username/:password', (req, res) => {
        pool.getConnection(function (err, connection){
          if(err){
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
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
                res.end(JSON.stringify(result)); 
              }
            });
          }
        });
      });


      app.get('/getUserByID/:userID', (req, res) => {
        pool.getConnection(function (err, connection){
          if(err){
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
            var user_id = req.param('userID');
            connection.query("SELECT * FROM hangout.users WHERE user_id = ?", user_id, function (err, result, fields) {
              connection.release();
              if (err) {
                logger.error("Error while fetching values: \n", err);
                res.status(400).json({
                  "data": [],
                  "error": "Error obtaining values"
                })
              } else {
                res.end(JSON.stringify(result)); 
              }
            });
          }
        });
      });

      app.put('/updateUser/:userID', (req, res) => {
        pool.getConnection(function (err, connection){
        if(err){
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
            var user_id = req.param('userID');
            var username_new = req.body.username
            var password_new = req.body.password
            var first_name_new = req.body.first_name
            var last_name_new = req.body.last_name
            var pronoun_new = req.body.pronoun
            var gender_new = req.body.gender
            var age_new = req.body.age
            var bio_new = req.body.bio
        
            connection.query("UPDATE users SET username = ?, password = ?, first_name = ?, last_name = ?, pronoun = ?, gender = ?, age = ?, bio = ? WHERE user_id = ?", [username_new, password_new, first_name_new, last_name_new, pronoun_new, gender_new, age_new, bio_new, user_id], function (err, result, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
              })
            } else {
                res.end(JSON.stringify(result));
              }
            });
          }
        });
        });

        async function hashPassword(password) {
            const saltRounds = 10;
            const hashedPassword = await new Promise((resolve, reject) => {
              bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
              });
            })
            console.log(password);
            console.log(hashedPassword);
            return hashedPassword
          }
          
        app.post('/registerUser', (req, res) => {
            pool.getConnection(function (err, connection){
              if(err){
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
              } else {
                    var username = req.body.username
                    var password = req.body.password
                    //var hash = bcrypt.hash(password, 10); //salt the password 10 times
                    var hashedPassword = hashPassword(password);
                    console.log('HELLO 1');
                    console.log(hashedPassword);
                    console.log('HELLO 2');
                    connection.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hashedPassword], function (err, result, fields) {
                    connection.release();
                    if (err) {
                      logger.error("Error while fetching values: \n", err);
                      res.status(400).json({
                      "data": [],
                      "error": "Error obtaining values"
                      })
                    } else {
                        res.end(JSON.stringify(result));
                      }
                  });
                }
              if (err) {
                res.status(500).send('Something went wrong 1');
              }
            });
          });
          app.put('/updateUser/:userID', (req, res) => {
            pool.getConnection(function (err, connection){
            if(err){
              logger.error('Problem obtaining MySQL connection',err)
              res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var user_id = req.param('userID');
                var username_new = req.body.username
                var password_new = req.body.password
                var first_name_new = req.body.first_name
                var last_name_new = req.body.last_name
                var pronoun_new = req.body.pronoun
                var gender_new = req.body.gender
                var age_new = req.body.age
                var bio_new = req.body.bio
            
                connection.query("UPDATE users SET username = ?, password = ?, first_name = ?, last_name = ?, pronoun = ?, gender = ?, age = ?, bio = ? WHERE user_id = ?", [username_new, password_new, first_name_new, last_name_new, pronoun_new, gender_new, age_new, bio_new, user_id], function (err, result, fields) {
                connection.release();
                if (err) {
                  logger.error("Error while fetching values: \n", err);
                  res.status(400).json({
                  "data": [],
                  "error": "Error obtaining values"
                  })
                } else {
                    res.end(JSON.stringify(result));
                  }
                });
              }
            });
            });

            app.delete('/DeleteUser/:userID', (req, res) => {
                pool.getConnection(function (err, connection){
                if(err){
                  logger.error('Problem obtaining MySQL connection',err)
                  res.status(400).send('Problem obtaining MySQL connection'); 
                } else {
                    var user_id = req.param('userID');
                    connection.query("DELETE FROM users WHERE user_id = ?", user_id, function (err, result, fields) {
                    connection.release();
                    if (err) {
                      logger.error("Error while fetching values: \n", err);
                      res.status(400).json({
                      "data": [],
                      "error": "Error obtaining values"
                      })
                    } else {
                        res.end(JSON.stringify(result)); 
                      }
                    });
                  }
                });
                });

                app.get('/users_in_groups/:group_id', (req, res) => {
                    pool.getConnection(function (err, connection){
                      if(err){
                        logger.error('Problem obtaining MySQL connection',err)
                        res.status(400).send('Problem obtaining MySQL connection'); 
                      } else {
                        var group_id = req.param('group_id');
                        connection.query(`SELECT u.user_id, u.username, u.first_name, u.last_name, u.pronoun, u.age, u.gender, u.bio
                                              FROM users u
                                              INNER JOIN users_in_groups g
                                              ON u.user_id = g.user_id
                                              WHERE g.group_id = ?`, group_id, function (err, result, fields) {
                          connection.release();
                          if (err) {
                            logger.error("Error while fetching values: \n", err);
                            res.status(400).json({
                              "data": [],
                              "error": "Error obtaining values"
                            })
                          } else {
                            res.end(JSON.stringify(result)); 
                          }
                        });
                      }
                    });
                  });
                
}