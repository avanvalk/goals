const client = require('../lib/db-client');
const bcrypt = require('bcryptjs');

const dogs = [
  { name: 'Clean', type: 'gutters.' },
  { name: 'Rake', type: 'leaves.' },
  { name: 'Wash', type: 'dishes.' }
];

client.query(`
  INSERT INTO profile (username, hash)
  VALUES ($1, $2)
  RETURNING id;
`,
['avanvalk', bcrypt.hashSync('drewby', 8)]
)
  .then(result => {
    const profile = result.rows[0];

    return Promise.all(
      dogs.map(dog => {
        return client.query(`
          INSERT INTO dog (name, type, profile_id)
          VALUES ($1, $2, $3)
        `,
        [dog.name, dog.type, profile.id]);
      })
    );
  })
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });