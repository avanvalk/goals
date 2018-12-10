const client = require('../lib/db-client');

const dogs = [
  { name: 'Niko', type: 'Shiba' },
  { name: 'Potato', type: 'Lab' },
  { name: 'Thor', type: 'Retriever' }
];

client.query(`
  INSERT INTO profile (username, password)
  VALUES ($1, $2)
  RETURNING id;
`,
['avanvalk', 'drew']
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