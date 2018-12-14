
const router = require('express').Router();
const client = require('../db-client');
const bcrypt = require('bcryptjs');

router
  .post('/signup', (req, res) => {

    const body = req.body;
    const username = body.username;
    const password = body.password;
    
    if(!username || !password) {
      res.status(400).json({ error: 'information required' });
      return;
    }

    client.query(`
      SELECT id
      FROM profile
      WHERE username = $1;
    `,
    [username])  
      .then(result => {
        if(result.rows.length > 0) {
          res.status(400).json({ error: 'username unavailable' });
          return;
        }

        client.query(`
          INSERT into profile (username, hash)
          VALUES ($1, $2)
          RETURNING id, username;
        `,
        [username, bcrypt.hashSync(password, 8)]
        )
          .then(result => {
            res.json(result.rows[0]);
          });
      });
  })
  
  .post('/signin', (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    if(!username || !password) {
      res.status(400).json({ error: 'information required' });
      return;
    }

    client.query(`
      SELECT id, username, password 
      FROM profile
      WHERE username = $1;
    `,
    [username]
    )
      .then(result => {
        if(result.rows.length === 0 || result.rows[0].password !== password) {
          res.status(400).json({ error: 'information incorrect' });
          return;
        }

        res.json({
          id: result.rows[0].id,
          username: result.rows[0].username
        });
      });
  });

module.exports = router;