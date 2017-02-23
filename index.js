const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app
  .set('view engine', 'pug')
  .use(express.static('public'))
  // parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  .use(bodyParser.json())

//ROUTES
const taskList = require('./app/route-tasks.js')
const addTask = require('./app/route-add-task.js')
const deleteTaskRoute = require('./app/route-delete-one-task.js')
const deleteAllToDoRoute = require('./app/route-delete-alltodo.js')
const deleteAllCompleted = require('./app/route-delete-allcompleted.js')
const completed = require('./app/route-completed.js')
const completedAll = require('./app/route-complete-all.js')

app
  .use('/', taskList)
  .use('/addTask', addTask)
  .use('/delete', deleteTaskRoute)
  .use('/deleteAllToDo', deleteAllToDoRoute )
  .use('/deleteAllCompleted', deleteAllCompleted )
  .use('/completed', completed )
  .use('/completedAll', completedAll)
  


app.listen(3000, () => console.log('Listening ont PORT 3000'))

