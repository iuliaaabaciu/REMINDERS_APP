const express = require('express');
const remindersDatabase = require('./remindersLogic');
const usersDatabase = require('./usersLogic');

const app = express();
app.use(express.json());

// REMINDERS
app.get('/reminders', async (req, res) => {
  const listReminders = await remindersDatabase.listReminders();
  res.json(listReminders);
})

app.post('/reminders', async(req, res) => {
  const { userId, category, dateScheduled } = req.body;
  await remindersDatabase.createReminder(userId, category, dateScheduled);
  res.json(); 
})

// delete reminder
app.delete('/reminders/:id', async(req, res) => {
  const id = req.params.id;
  await remindersDatabase.deleteReminder(id);
  res.json();
})

app.delete('/reminders/deleteAllReminders/:userId', async(req, res) => {
  const userId = req.params.userId;
  await remindersDatabase.deleteAllReminders(userId);
  res.json();
})

// USERS
app.post('/registration', async(req, res) => {
  const { firstName, lastName, email, password } = req.body;
  await usersDatabase.register(firstName, lastName, email, password);
  res.json();
})

app.get('/login', async(req, res) => {
  const { email, password } = req.body;
  await usersDatabase.login(email, password)
        .then("Login was successful")
        .catch(error => console.log('THIS IS THE ERROR', error));
  res.json('success');
});

app.listen(8080)