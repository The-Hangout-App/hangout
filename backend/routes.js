const { group } = require('console');
const { response } = require('express');
const createPool = require('./hangout')

const createPoolConnection = async () => //modified version of createPoolAndEnsureSchema from google example
  await createPool()
    .then(async pool => {
      return pool;
    })
    .catch(err => {
      logger.error(err);
      throw err;
    });

let pool;

module.exports = function routes(app, logger) {

app.use(async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPoolConnection();
    next();
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

//JACK
//gets the groups that a user is in
app.get('/users/:user_id/groups', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var user_id = req.param('user_id');
      connection.query("Select cards.activity_name, hangout.groups.group_id, hangout.groups.numMembers, hangout.groups.maxMembers from ((hangout.groups INNER JOIN cards on hangout.groups.card_id = cards.card_id) INNER JOIN users_in_groups ON users_in_groups.group_id = hangout.groups.group_id) where users_in_groups.user_id = ?", user_id, function (err, result, fields) {
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

//adds a user to a group
app.put('/groups/:groupid/:userid', (req, res) => {
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
      connection.query("INSERT INTO users_in_groups ( group_id, user_id) VALUES (?,?)", [group_id, user_id], function (err, result, fields) {
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

//creates a user for register page
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

//logs in a user
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


//creates a new group
app.post('/groups', (req, res) => {

  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
      if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
          var card_id = req.body.card_id
          var numMembers = 0 
          var maxMembers = req.body.maxMembers
          var date = req.body.date
          var time = req.body.time
    
          // if there is no issue obtaining a connection, execute query
          connection.query('INSERT INTO hangout.groups (card_id, numMembers, maxMembers, date, time) VALUES(?, ?, ?, ?, ?)',[card_id, numMembers, maxMembers, date, time], function (err, rows, fields) {
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


//gets a user information given the userid
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

//gets information about activity based on id
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
          var username = req.body.username
          var password = req.body.password
          var first_name = ""
          var last_name = ""
          var pronoun = ""
          var age = ""
          var gender = ""
          var bio = ""
          // if there is no issue obtaining a connection, execute query
          connection.query('INSERT INTO hangout.users (user_id, username, password, first_name, last_name, pronoun, age, gender, bio) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?)',[username, password, first_name, last_name, pronoun, age, gender, bio], function (err, rows, fields) {
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

// app.get('/chatmembers/:chat_id', (req, res) => {
//   // obtain a connection from our pool of connections
//   pool.getConnection(function (err, connection){
//     if(err){
//       // if there is an issue obtaining a connection, release the connection instance and log the error
//       logger.error('Problem obtaining MySQL connection',err)
//       res.status(400).send('Problem obtaining MySQL connection'); 
//     } else {
//       // if there is no issue obtaining a connection, execute query and release connection
//       var chat_id = req.param('chat_id');
//       connection.query("SELECT * FROM chat_members WHERE chat_id = ?", chat_id, function (err, result, fields) {
//         connection.release();
//         if (err) {
//           logger.error("Error while fetching values: \n", err);
//           res.status(400).json({
//             "data": [],
//             "error": "Error obtaining values"
//           })
//         } else {
//           res.end(JSON.stringify(result)); // Result in JSON format
//           // res.status(200).json({
//           //   "data": rows
//           // });
//         }
//       });
//     }
//   });
// });

// app.get('/messages/:chat_id', (req, res) => {
//   // obtain a connection from our pool of connections
//   pool.getConnection(function (err, connection){
//     if(err){
//       // if there is an issue obtaining a connection, release the connection instance and log the error
//       logger.error('Problem obtaining MySQL connection',err)
//       res.status(400).send('Problem obtaining MySQL connection'); 
//     } else {
//       // if there is no issue obtaining a connection, execute query and release connection
//       var chat_id = req.param('chat_id');
//       connection.query("SELECT * FROM messages WHERE chat_id = ?", chat_id, function (err, result, fields) {
//         connection.release();
//         if (err) {
//           logger.error("Error while fetching values: \n", err);
//           res.status(400).json({
//             "data": [],
//             "error": "Error obtaining values"
//           })
//         } else {
//           res.end(JSON.stringify(result)); // Result in JSON format
//           // res.status(200).json({
//           //   "data": rows
//           // });
//         }
//       });
//     }
//   });
// });

// app.post('/user/register', (req, res) => {
//   // obtain a connection from our pool of connections
//   pool.getConnection(function (err, connection){
//       if(err){
//           // if there is an issue obtaining a connection, release the connection instance and log the error
//           logger.error('Problem obtaining MySQL connection',err)
//           res.status(400).send('Problem obtaining MySQL connection'); 
//       } else {

//           var username = req.body.username
//           var password = req.body.password
//           // if there is no issue obtaining a connection, execute query
//           connection.query('INSERT INTO users (username, password) VALUES(?, ?)',[username, password], function (err, rows, fields) {
//               if (err) { 
//                   // if there is an error with the query, release the connection instance and log the error
//                   connection.release()
//                   logger.error("Error while creating user: \n", err); 
//                   res.status(400).json({
//                       "data": [],
//                       "error": "MySQL error"
//                   })
//               } else{
//                   res.status(200).json({
//                       "data": rows
//                   });
//               }
//           });
//       }
//   });
// });



//figures out which group is newest
app.get('/newestGroup', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      connection.query("Select Max(group_id) as gid from hangout.groups", function (err, result, fields) {
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
      connection.query("SELECT username, first_name, last_name, bio, age, gender, pronoun, photo_url FROM hangout.users WHERE user_id = ?", user_id, function (err, result, fields) {
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

function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })
  return hashedPassword
}

//register route that takes a username and password and stores the hashed password in the DB not the plaintext password
app.post('/registerUser', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
          var username = req.body.username
          var password = req.body.password
            bcrypt.hash(password, 1, function(err, hash) {
              if (err) reject(err)
              connection.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hash], function (err, result, fields) {
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
          });
      }
    if (err) {
      res.status(500).send('Something went wrong');
    }
  });
});

//login route that returns user_id or empty array, given the username and pasword stored in the DB (hashed password)
//returns user_id if hashed password matches password and an empty array if they do not match
app.post('/login', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
        var username = req.body.username
        var password = req.body.password
        connection.query("SELECT password, user_id FROM users WHERE username = ?", username, function (err, result, fields) {
        connection.release();
        if(err) {
          throw err
        } else {
          console.log(result)
          console.log(result[0])
            bcrypt.compare(password, result[0].password, function(err, isMatch) {
              if(err) {
                throw err
              } else if (!isMatch){
                  console.log("Password doesn't match!") 
                  emptyArray = []
                  res.end(JSON.stringify(emptyArray)); //if password doesn't match return empty array
              } else {
                  console.log("Password matches!")
                  res.end(JSON.stringify([result[0].user_id])); //if password matches return userID
              }
            });
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
    var first_name_new = req.body.first_name
    var last_name_new = req.body.last_name
    var photo_url_new = req.body.photo_url
    var pronoun_new = req.body.pronoun
    var gender_new = req.body.gender
    var age_new = req.body.age
    var bio_new = req.body.bio

    connection.query("UPDATE users SET first_name = ?, last_name = ?, photo_url = ?, pronoun = ?, gender = ?, age = ?, bio = ? WHERE user_id = ?", [first_name_new, last_name_new, photo_url_new, pronoun_new, gender_new, age_new, bio_new, user_id], function (err, result, fields) {
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
      connection.query(`SELECT u.user_id, u.username, g.group_id, u.first_name, u.last_name, u.pronoun, u.age, u.gender, u.bio, u.photo_url
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


app.get('/newestGroup', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      connection.query("Select Max(group_id) as gid from hangout.groups", function (err, result, fields) {
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
app.get('/users/groups/:user_id', (req, res) => {
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection');
    } else {
      var user_id = req.param('user_id');
      connection.query("select g.group_id, c.card_id, activity_name, numMembers, maxMembers, date, time from users_in_groups u join hangout.groups g on u.group_id = g.group_id join cards c on c.card_id = g.card_id where u.user_id = ?", user_id, function (err, result, fields) {
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
  pool.getConnection(function (err, connection) {
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

//adds an activity to the activity table 
app.post('/newActivity', (req, res) =>  {
  console.log(req.body);
  pool.getConnection(function (err, connection){
    if(err){
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      var activity_category_id = req.body.activity_category_id
      var activity_name = req.body.activity_name
      var address = req.body.address
      var phone_number = req.body.phone_number
      var photo_url = req.body.photo_url
      var min_num_participants = req.body.min_num_participants
      var max_num_participants = req.body.max_num_participants
      var min_age = req.body.min_age
      var max_age = req.body.max_age
      var city = req.body.city
      var state = req.body.state
      var zipcode = req.body.zipcode
      connection.query(`INSERT INTO cards (activity_category_id, activity_name, address, phone_number, photo_url, min_num_participants, max_num_participants, min_age, max_age, city, state, zipcode) VALUES ('${activity_category_id}', '${activity_name}', '${address}', '${phone_number}','${photo_url}','${min_num_participants}','${max_num_participants}','${min_age}','${max_age}','${city}','${state}','${zipcode}');`, 
      function (err, result, fields) {
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