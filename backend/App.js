const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])
const cors = require('cors');
const app = express();

const port = 8080; 

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`Alrighty weather-boi, this john do be running on port ${port}`))

/// --------------------- Users --------------------- ///


app.post('/users', (req, res) => {
  const {username, firstName, lastName, email, role} = req.body
  knex('users')
  .insert({
    username: username,
    firstName:firstName,
    lastName: lastName,
    email: email,
    role: role
  })
  .then(res.status(201).send())
  .catch(e => res.status(500).send())
})

app.patch('/users', (req, res) => {
  const {userId, username, firstName, lastName, email, role} = req.body
  knex('users')
  .where('userId', userId)
  .update({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.delete('/users', (req, res) => {
  const {userId} = req.body
  knex('users')
  .where('id', userId)
  .del()
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})


/// --------------------- Events --------------------- ///

app.get('/events', (req, res) => {
  knex('events')
  .select('*')
  .then(data => res.send(data))
  .catch(e => res.status(500).send())
})

app.post('/events', (req, res) => {
  const {title, type, description, start, end, fundRequired, volunteerNeeded, userId} = req.body
  knex('events')
  .insert({
    title: title,
    type: type,
    description: description,
    start: start,
    end: end, 
    // date in this format 'yyyy-mm-dd'
    fundRequired: fundRequired,
    volunteerNeeded: volunteerNeeded,
    userId: userId
  })
  .then(res.status(201).send())
  .catch(e => res.status(500).send())
})

app.patch('/events', (req, res) => {
  const {id, title, type, description, date, fundRequired, volunteerNeeded, userId} = req.body
  knex('events')
  .where('id', id)
  .update({
    title: title,
    type: type,
    description: description,
    date: date,
    // date in this format 'yyyy-mm-dd'
    fundRequired: fundRequired,
    volunteerNeeded: volunteerNeeded,
    userId: userId
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.delete('/events', (req, res) => {
  const {id} = req.body
  knex('events')
  .where('id', id)
  .del()
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

/// --------------------- Volunteers --------------------- ///

app.get('/volunteers', (req, res) => {
  knex('volunteers')
  .select('*')
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.post('/volunteers', (req, res) => {
  const {firstName, lastName, email, phone, event_id} = req.body
  knex('volunteers')
  .insert({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    event_id: event_id,
  })
  .then(res.status(201).send())
  .catch(e => res.status(500).send())
})

app.patch('/volunteers', (req, res) => {
  const {id, lastName, email, phone, event_id} = req.body
  knex('volunteers')
  .where('id', id)
  .update({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    event_id: event_id,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.delete('/volunteers', (req, res) => {
  const {id} = req.body
  knex('volunteers')
  .where('id', id)
  .del()
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

/// --------------------- Funds --------------------- ///

app.get('/funds', (req, res) => {
  knex('funds')
  .select('*')
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.post('/funds', (req, res) => {
  const {type, amount, event_id} = req.body
  knex('funds')
  .insert({
    type: type,
    amount: amount,
    event_id: event_id,
  })
  .then(res.status(201).send())
  .catch(e => res.status(500).send())
})

app.patch('/funds', (req, res) => {
  const {id, type, amount, event_id} = req.body
  knex('funds')
  .where('id', id)
  .update({
    type: type,
    amount: amount,
    event_id: event_id,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.delete('/funds', (req, res) => {
  const {id} = req.body
  knex('funds')
  .where('id', id)
  .del()
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

/// --------------------- Donations --------------------- ///

app.get('/donations', (req, res) => {
  knex('donations')
  .select('*')
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.post('/donations', (req, res) => {
  const {amount, name} = req.body
  knex('donations')
  .insert({
    amount: amount,
    name: name,
  })
  .then(res.status(201).send())
  .catch(e => res.status(500).send())
})

app.patch('/donations', (req, res) => {
  const {id, amount, name} = req.body
  knex('donations')
  .where('id', id)
  .update({
    amount: amount,
    name: name,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.delete('/donations', (req, res) => {
  const {id} = req.body
  knex('donations')
  .where('id', id)
  .del()
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})