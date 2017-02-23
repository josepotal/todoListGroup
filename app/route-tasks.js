const express = require('express')
const router = express.Router()
const jsonfile = require('jsonfile')

var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)


router.get('/', (req, res) => {
  tasks = jsonfile.readFileSync(fileName);
  const title = 'Tasks List'
  let counter = 0
  let message = ''
  let auxTasks = tasks.filter(elem => {
    return !elem.completionDate
  })
  res.render('index', {title, auxTasks, counter, message})
})

module.exports = router