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


//ROUTES
const taskList = require('./app/route-tasks.js')
const addTask = require('./app/route-add-task.js')
const deleteTaskRoute = require('./app/route-delete-one-task.js')
const deleteAllToDoRoute = require('./app/route-delete-alltodo.js')
const deleteAllCompleted = require('./app/route-delete-allcompleted.js')
const completed = require('./app/routes-completed.js')
const completedAll = require('./app/route-complete-all.js')



const fileName = './src/data/tasks.json'
let tasks = jsonfile.readFileSync(fileName)

// TASK LIST METHODS

app
  .use('/', taskList)
  .use('/delete', deleteTaskRoute)
  .use('/deleteAllToDo', deleteAllToDoRoute )
  .use('/deleteAllCompleted', deleteAllCompleted )
  .use('/completed', completed )
  .use('/completedAll', completedAll)
  .use('/addTask', addTask)


app.listen(3000, () => console.log('Listening ont PORT 3000'))

