const express = require('express')
const router = express.Router()
const jsonfile = require('jsonfile')

var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)


router.post('/', (req, res) => {
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

function addZero (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
};

module.exports = router