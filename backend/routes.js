const { group } = require('console');
const { response } = require('express');
const pool = require('./hangout')

module.exports = function routes(app, logger) {

//JACK
app.post('/groups/:groupid/:userid', (req, res) => {
  pool.getConnection(function (err, connection){
  if(err){
    logger.error('Problem obtaining MySQL connection',err)
    res.status(400).send('Problem obtaining MySQL connection'); 
  } else {
       user_id = req.param('userid');
       group_id = req.param('groupid');
       console.log(user_id)
       console.log(group_id)
       connection.query("UPDATE hangout.groups SET numMembers = numMembers + 1 where group_id= ?", [group_id], function (err, result, fields) {
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
      connection.query("INSERT INTO users_in_groups ( group_id, user_id) VALUES (?,?)", [user_id, group_id], function (err, result, fields) {
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

app.post('/user/loggingIn', (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
      if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

          var username = req.body.username
          var password = req.body.password
        console.log(password)

          // if there is no issue obtaining a connection, execute query
          connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username, password], function (err, rows, fields) {
              if (err) { 
                  // if there is an error with the query, release the connection instance and log the error
                  connection.release()
                  logger.error("Error while creating user: \n", err); 
                  res.status(400).json({
                      "data": [],
                      "error": "MySQL error"
                  })
              } else if (rows.length > 0){
                  res.status(200).json({
                      "data": rows
                  });
                  res.send("Correct Password and username")
              }
              else{
                res.send("Incorrect Username and Password")
              }
          });
      }
  });
});


app.post('/user/logging', (req, res) => {
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
          if(username && password )
          {
          connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username, password], function (err, results, fields) {
              if (results.length > 0) { 
                  // if there is an error with the query, release the connection instance and log the error
                  response.send('Correct Password')
              } else{
                  response.send("Incorrect username and password")
              }
          });}
          else{
            response.send("Please enter Username and Password!")
          }
      }
  });
});

// POST /user/login
app.post('/user/login', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  console.log(username)
  if (username && password) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.send('Correct Password');
      } else {
        response.send('Incorrect Username and/or Password!');
      }			
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

var crypto = require('crypto');

var generateSalt = function(length) {
	return crypto.randomBytes(length).toString('hex').slice(0, length);
}

var sha512 = function(password, salt) {
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return value;
};

app.post('/createUser', (req, res) =>  {
  console.log(req.body);

  var username = req.body.username;
  var userPassword = req.body.password;
  pool.getConnection(function (err, connection){
  connection.query('SELECT username FROM users WHERE username = ?', [username], function(err, results, fields) {
    if(results.length != 0) {
      res.send('Username already in use!');
    }
    else {
      var salt = generateSalt(16);
      var passwordHash = sha512(userPassword, salt);
      
      connection.query(`INSERT INTO users  (username, password, passwordSalt) VALUES ('${username}', '${passwordHash}', '${salt}');`);
          };
  });
});
});

app.post('/auth', function(req, res, next) {
  var username = req.body.username;
  var userPassword = req.body.password;

  console.log(username);
  console.log(userPassword);

  if(username && userPassword) {
    connection.query('SELECT user_id, passwordSalt, password FROM users WHERE username = ?', [username], function(err, results, fields) {
      if(results.length > 0) {
        var storedSalt = results[0].passwordSalt;
        var storedHash = results[0].password;
        if(storedHash == sha512(userPassword, storedSalt)) {
          req.session.loggedin = true;
          req.session.userID = results[0].user_id;
          console.log("successful login");
          userId = results[0].user_id
          console.log("The user id: " + userId);
          res.send("The user id: " + userId);
        }
        else {
          res.send("Incorrect username and/or password");
        }
      }
      else {
        res.send("Incorrect username and/or password");
      }
    });
  }
  else {
    res.send("Please enter a username and password!");
    res.end();
  }
});


app.post('/groups', (req, res) => {

  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
      if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          var card_id = req.body.card_id
          var numMembers = 1 
          var maxMembers = req.body.maxMembers
          var date = req.body.password
          var time = req.body.first_name
    
          // if there is no issue obtaining a connection, execute query
          connection.query('INSERT INTO groups (card_id, chat_id, numMembers, maxMembers, date, time) VALUES(?, ?, ?, ?, ?, ?)',[card_id, chat_id, numMembers, maxMembers, date, time], function (err, rows, fields) {
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

app.post('/groups/:groupid/:userid', (req, res) => {
  pool.getConnection(function (err, connection){
  if(err){
    logger.error('Problem obtaining MySQL connection',err)
    res.status(400).send('Problem obtaining MySQL connection'); 
  } else {
       user_id = req.param('userid');
       group_id = req.param('groupid');
       console.log(user_id)
       console.log(group_id)
       connection.query("UPDATE hangout.groups SET numMembers = numMembers + 1 where group_id= ?", [group_id], function (err, result, fields) {
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
      connection.query("INSERT INTO users_in_groups (group_id, user_id) VALUES (?,?)", [user_id, group_id], function (err, result, fields) {
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

//BRIGITTA - FROM HERE ON

const bcrypt = require('bcryptjs');

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
// app.post('/registerUser', (req, res) => {
//   pool.getConnection(function (err, connection){
//   if(err){
//     logger.error('Problem obtaining MySQL connection',err)
//     res.status(400).send('Problem obtaining MySQL connection'); 
//   } else {
//       var username = req.body.username
//       var password = req.body.password
//       connection.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], function (err, result, fields) {   
//       connection.release();
//       if (err) {
//         logger.error("Error while fetching values: \n", err);
//         res.status(400).json({
//         "data": [],
//         "error": "Error obtaining values"
//         })
//       } else {
//           res.end(JSON.stringify(result)); 
//         }
//       });
//     }
//   });
// });

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })
  return hashedPassword
}

// var hashPassword = async function(password){
//   console.log(bcrypt.hash(password,10));
//   var hashPwd = await bcrypt.hash(password,10);
//   console.log(hashPwd);
//   return hashPwd
// }

// const saltPassword = async (password) => {
//   const newHash = await bcrypt.hash(password, 10, (err, hash) => {
//     if (err) return err;
//     return hash;
//   });
//   return newHash; // no need to await here
// }

async function helper(password) {
  var hashedPassword = await hashPassword(password);
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
          var hashedPassword = helper(password);
          //var hashedPassword = await hashPassword(password);
          console.log(hashedPassword)
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
//given a group_id, return an array of users (not user_ids)
app.get('/users_in_groups/:group_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var group_id = req.param('group_id');
      connection.query(`SELECT u.user_id, u.username, u.password, u.first_name, u.last_name, u.pronoun, u.age, u.gender, u.bio
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
      connection.query("SELECT * FROM `groups` WHERE card_id = ?", card_id, function (err, result, fields) {
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
//given a userID, return an array of groups that a user has joined
app.get('/groups/:user_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var user_id = req.param('user_id');
      connection.query("SELECT group_id FROM `users_in_groups` WHERE user_id = ?", user_id, function (err, result, fields) {
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
//given a groupID, return a single group object
app.get('/groups/groupid/:group_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var group_id = req.param('group_id');
      connection.query("SELECT * FROM hangout.groups WHERE group_id = ?", group_id, function (err, result, fields) {
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
