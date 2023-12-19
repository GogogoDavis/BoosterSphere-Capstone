const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const bcrypt = require('bcrypt');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ limit: '10mb' }));


app.listen(port, () => console.log(`Alrighty weather-boi, this john do be running on port ${port}`))

/// --------------------- Users --------------------- ///


app.post('/users/register', async (req, res) => {
  const { username, firstName, lastName, email, role, password, profileImage } = req.body;
  try {
    let emailIsDuplicate = false;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check for duplicate username or email
    const userData = await knex('users').select('*');
    userData.forEach(existingUser => {
      if (existingUser.email === email) {
        emailIsDuplicate = true;
      }
    });

    if (!emailIsDuplicate) {
      await knex('users').insert({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        password: hashedPassword,
        profileImage: profileImage,
      });
      res.status(201).send();
    } else {
      res.status(400).send('Username or email already exists');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});


app.post('/users/login', async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await knex('users').select('*').where('email', email)
    if (!user[0]) {
      return res.status(400).send('no user found')
    }
    if(await bcrypt.compare(password, user[0].password)) {
      res.status(200).send({userId: user[0].userId, username: user[0].username, firstName: user[0].firstName, lastName: user[0].lastName, email: user[0].email, profileImage: user[0].profileImage})
    } else {
      res.status(400).send('wrong password')
    }
  } catch {
    res.status(500).send()
  }
})

app.get('/users/image', async (req, res) => {
  const {userId} = req.query
  knex('users').select('profileImage').where('userId', userId)
    .then(img => res.status(200).send(img))
    .catch(err => res.status(500).send())
})

app.patch('/users', (req, res) => {
  const {userId, username, firstName, lastName, email, role, profileImage} = req.body
  knex('users')
  .where('userId', userId)
  .update({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
    profileImage: profileImage,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.patch('/users/password', async (req, res) => {
  const {userId, password} = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').where('userId', userId).update({
      password: hashedPassword,
    });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
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


app.post('/events', async(req, res) => {
  const {title, type, description, start, end, fundRequired, volunteerNeeded, userId} = req.body
  const maxIdQuery = await knex('events').max('id as maxId').first()
  knex('events')
  .insert({
    id: maxIdQuery.maxId + 1,
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
  .then(() => {res.status(201).send({message: 'wowzers'})})
  .catch(e => res.status(500).send())
})

app.patch('/events/:id', (req, res) => {
  const {id, title, type, description, start, end, fundRequired, volunteerNeeded, userId} = req.body
  knex('events')
  .where('id', id)
  .update({
    id: id,
    title: title,
    type: type,
    description: description,
    start: start,
    end: end,
    fundRequired: fundRequired,
    volunteerNeeded: volunteerNeeded,
    userId: userId
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})

app.delete('/events/:id', (req, res) => {
    knex('events').where('id', req.params.id)
  .del()
  .then(() => res.json({message: `it done got gone, it OUTTA HERE`}))
})

/// --------------------- Volunteers --------------------- ///

app.get('/volunteers', (req, res) => {
  knex('volunteers')
  .select('*')
  .then(data => res.status(200).send(data))
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
  .orderBy('id', 'desc')
  .then(data => res.send(data))
  .catch(e => res.status(500).send())
})

app.post('/funds', async (req, res) => {
  const {title, details, amount, currRaised} = req.body
  // const maxIdQuery = await knex('funds').max('id as maxId').first()
  knex('funds')
  .insert({
    // id: maxIdQuery.maxId + 1,
    title: title,
    details: details,
    amount: amount,
    currRaised: currRaised,
  })
  .then(res.status(201).send(console.log(req.body)))
  .catch(e => res.status(500).send())
})

app.patch('/funds', (req, res) => {
  const {id, type, amount, event_id, currRaised} = req.body
  knex('funds')
  .where('id', id)
  .update({
    type: type,
    amount: amount,
    currRaised: currRaised,
    event_id: event_id,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})


app.put('/funds/:id', (req, res) => {
  knex('funds').where('id', req.params.id)
  .update({
    currRaised: req.body.currRaised,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})


app.delete('/funds/:id', (req, res) => {
  knex('funds').where('id', req.params.id)
  .del()
  .then(()=>{
    knex('funds')
    .select('*')
    .then(data => {
      res.json(data);
    })
  })
})

/// --------------------- Donations --------------------- ///

app.get('/donations', (req, res) => {
  knex('donations')
  .select('*')
  .then(data => res.status(200).send(data))
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


/// --------------------- Landing Page typing message --------------------- ///


app.get('/list', (req, res) => {
  knex('list')
  .select('*')
  .then(data => res.status(200).send(data))
  .catch(e => res.status(500).send())
})

app.patch('/list/:id', (req, res) => {
  const {id, event} = req.body
  knex('events')
  .where('id', id)
  .update({
    id: id,
    event: event,
  })
  .then(res.status(200).send())
  .catch(e => res.status(500).send())
})


/// --------------------- Home Page / Dashboard --------------------- ///


app.get('/dashboard/events', (req, res) => {
  knex('events')
    .select('title', 'start', 'end', 'fundRequired', 'volunteerNeeded')
    .orderBy('start', 'asc')
    .then(data => res.status(200).send(data))
    .catch(e => res.status(500).send());
});


app.get('/dashboard/donations', (req, res) => {
  knex('donations')
    .select('name', 'amount')
    .then(data => res.status(200).send(data))
    .catch(e => res.status(500).send());
});

app.get('/dashboard/funds', (req, res) => {
  knex('funds')
    .select('title', 'amount', 'currRaised')
    .then(data => res.status(200).send(data))
    .catch(e => res.status(500).send());
});




/// --------------------- Home Page / Dashboard --------------------- ///



app.get('/funds/transaction', (req, res) => {
  knex('transaction')
  .select('*')
  .orderBy('id', 'desc')
  .then(data => res.status(200).send(data))
  .catch(e => res.status(500).send())
})

app.post('/funds/transaction', (req, res) => {
  const {title, amount, event_id, status} = req.body
  knex('transaction')
  .insert({
    title: title,
    amount: amount,
    event_id: event_id,
    status: status
  })
  .then(res.status(201).send())
  .catch(e => res.status(500).send())
})


app.delete('/funds/transaction/:id', (req, res) => {
  knex('transaction').where('id', req.params.id)
.del()
.then(() => res.json({message: `it done got gone, it OUTTA HERE`}))
})
