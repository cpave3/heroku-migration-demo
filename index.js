
const express = require('express');
const cors = require('cors');
const app = express(); 
var bodyParser = require('body-parser');

const { Pool } = require('pg');

// In real life, you would want to pass these in from environment variables, or some other secure method.
const user = 'postgres';
const password = 'somePassword';
const localConnectionString = `postgres://${user}:${password}@localhost`;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || localConnectionString,	 
  ssl: process.env.DATABASE_URL ? {
    rejectUnauthorized: false 
  } : false
});

const PORT = process.env.PORT || 5000; 
app.use(cors()); 
app.use(express.json());
app.use(express.static('frontend/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/vegetables', (_req, res) => {
  const getString = 'SELECT * FROM vegetables';
  pool.query(getString)
    .then(allVegetables => {
      let vegetables = allVegetables.rows;
      res.json({ vegetables })
    })
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
}) 
