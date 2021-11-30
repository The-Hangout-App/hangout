const { group } = require('console');
const { response } = require('express');
const pool = require('./hangout')

module.exports = function user(app, logger) {



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

}