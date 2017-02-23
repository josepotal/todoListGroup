const express = require('express')
const router = express.Router()

const jsonfile = require('jsonfile')
const getDate = require('./helper-functions/get-date.js')
var newTask = require('./helper-functions/new-task-object.js')


var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)

router.post('/', (req, res) => {
  let bodyTask = req.body.bodyTask
  newTask = newTask(bodyTask)
  tasks.push(newTask);
  jsonfile.writeFile(fileName, tasks, {spaces: 2}, function (err) {
    if (err) return console.log(err);
  });
  res.redirect('/');
});


module.exports = router