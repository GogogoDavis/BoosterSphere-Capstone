const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])
const cors = require('cors');
const app = express();

const port = 8080; 

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`Alrighty weather-boi, this john do be running on port ${port}`))

app.get('/', (req, res) => {
    knex('initial_table')
    .select('*')
    .then(data => res.json(data))
})