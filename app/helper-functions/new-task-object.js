
function newTask(taskToAdd) { 

  const jsonfile = require('jsonfile')
  const getDate = require('./get-date.js')

  var fileName = './src/data/tasks.json'
  var tasks = jsonfile.readFileSync(fileName)
  //let bodyTask = req.body.bodyTask

  let id = '' + (tasks.length ? (+tasks[tasks.length - 1].id + 1) : 1)
  let body = taskToAdd
  let creationDate = getDate()
  let completionDate = ''


  let newTask = {id, body, creationDate, completionDate}
  
  return newTask
}

module.exports = newTask