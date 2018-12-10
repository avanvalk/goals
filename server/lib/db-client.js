const pg = require('pg');

// As we move to into deployment, this value will not
// be hard-coded, but instead come from environment configuration
const DATABASE_URL = 'postgres://postgres:drewby864@localhost:5432/school';
// on windows, linux, or other systems where you need to 
// specify username and password
// const databaseUrl = 'postgres://<username>:<password>@localhost:5432/liveable_cities';

const Client = pg.Client;

// create our pg client object
const client = new Client(DATABASE_URL);

// call connect
client.connect()
  // provide success/failure log based on connection working
  .then(() => console.log('connected to db', DATABASE_URL))
  .catch(err => console.error('connection error', err));

// listen for errors on the connection and log them
client.on('error', err => {
  console.error('\n**** DATABASE ERROR ****\n\n', err);
});

// export so other modules (files) can use
module.exports = client;