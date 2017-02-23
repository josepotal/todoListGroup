const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const jsonfile = require('jsonfile')


app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'pug')

const fileName = './src/data/tasks.json'
let tasks = jsonfile.readFileSync(fileName)
var message=""

// TASK LIST METHODS
app.get('/', (req, res) => {
  tasks = tasks;
  const title = 'Tasks List'
  let counter = 0
  let message = ''
  let auxTasks = tasks.filter(elem => {
    return !elem.completionDate
  })
  res.render('index', {title, auxTasks, counter, message})
})

app.post('/add', (req, res) => {
  let bodyTask = req.body.bodyTask
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let h = addZero(date.getHours())
  let m = addZero(date.getMinutes())
  let newTask = {
    id: '' + (tasks.length ? (+tasks[tasks.length - 1].id + 1) : 1),
    body: bodyTask,
    creationDate: `Created on ${day} / ${month + 1} / ${year} at ${h}:${m}`,
    completionDate: ''
  };
  tasks.push(newTask);
  jsonfile.writeFile(fileName, tasks, {spaces: 2}, function (err) {
    if (err) return console.log(err);
  });
  res.redirect('/');
});

// DELETE
app.get('/delete/:id', (req, res) => {
  let id = req.params.id
  let message = "Item removed"
  tasks = tasks.filter(elem => elem.id !== id)
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

app.get('/completed/delete/:id', (req, res) => {
  let id = req.params.id
  tasks = tasks.filter(elem => elem.id !== id)
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/completed')
})

// COMPLETED
app.get('/completed/:id', (req, res) => {
  let id = req.params.id
  tasks.map(task => {
    if (task.id === id) task.completionDate = 'Completed on ' + new Date()
  })
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

// ALL COMPLETED
app.get('/completedAll', (req, res) => {
  tasks.map(task => {
    task.completionDate = 'Completed on ' + new Date()
  })
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

// TASK COMPLETED METHODS
app.get('/completed', (req, res) => {
  const title = 'Task Completed'
  let counter = 0
  let auxTasks = tasks.filter(elem => {
    return elem.completionDate
  })
  res.render('completed', {title, auxTasks, counter})
})

// DELETE ALL TODO LIST
app.get('/deleteAllToDo', (req, res) => {
  let auxTasks = tasks.filter(elem => {
    return elem.completionDate
  })
  console.log(auxTasks)
  jsonfile.writeFile(fileName, auxTasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

//DELETE ALL COMPLETED TASKS
app.get('/deleteAllCompleted', (req, res) => {
  tasks = tasks.filter(elem => {
    return !elem.completionDate
  })

  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/completed')
})

app.listen(3000, () => console.log('Listening ont PORT 3000'))

function addZero (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
};