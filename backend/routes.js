const pool = require('./hangout')

module.exports = function routes(app, logger) {

//JACK


app.post('/groups', (req, res) => {

  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
      if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          var card_id = req.body.card_id
          var chat_id = req.body.chat_id
          var group_id = req.body.group_id
          var numMembers = req.body.numMembers
          var maxMembers = req.body.maxMembers
          var date = req.body.password
          var time = req.body.first_name
    
          // if there is no issue obtaining a connection, execute query
          connection.query('INSERT INTO groups (card_id, chat_id, group_id, numMembers, maxMembers, date, time) VALUES(?, ?, ?, ?, ?, ?, ?)',[card_id, chat_id, group_id, numMembers, maxMembers, date, time], function (err, rows, fields) {
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

app.get('/user/:userID/profile', (req, res) => {

  pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var activity_id = req.param('activityID');
      connection.query("SELECT * FROM cards WHERE card_id = ?", activity_id, function (err, result, fields) {
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


app.get('/activities/:activityID', (req, res) => {

  pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var activity_id = req.param('activityID');
      connection.query("SELECT * FROM cards WHERE card_id = ?", activity_id, function (err, result, fields) {
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

//BRIGITTA - FROM HERE ON
//given a username, return a user 
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
    
//given a username and password, return a user
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

//wyatt
//given a userID, return a user 
//tested
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

//wyatt
//register user
//tested
app.post('/registerUser', (req, res) => {
  pool.getConnection(function (err, connection){
  if(err){
    logger.error('Problem obtaining MySQL connection',err)
    res.status(400).send('Problem obtaining MySQL connection'); 
  } else {
      var username = req.body.username
      var password = req.body.password
      connection.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], function (err, result, fields) {
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

//wyatt
//update user
//tested
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

//wyatt
//delete user
//tested
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

//return an array of cards
app.get('/cards', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      connection.query(`SELECT * FROM cards`, function (err, result, fields) {
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

//given an activity category id, return an array of cards
app.get('/cards/:activity_category_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
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
          res.end(JSON.stringify(result)); 
        }
      });
    }
  });
});

//zech 
//tested
//given a group_id, return an array of user_ids
app.get('/users_in_groups/:group_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var group_id = req.param('group_id');
      connection.query(`SELECT user_id FROM users_in_groups WHERE group_id = ?`, group_id, function (err, result, fields) {
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

//zech
//tested
//given a card, return an array of groups
app.get('/groups/:card_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var card_id = req.param('card_id');
      connection.query("SELECT group_id FROM `groups` WHERE card_id = ?", card_id, function (err, result, fields) {
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
