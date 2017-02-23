const express = require('express')
const router = express.Router()
const jsonfile = require('jsonfile')

var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)

router.get('/', (req, res) => {
  tasks = jsonfile.readFileSync(fileName);
  const title = 'Task Completed'
  let counter = 0
  let auxTasks = tasks.filter(elem => {
    return elem.completionDate
  })
  res.render('completed', {title, auxTasks, counter})
})


router.get('/:id', (req, res) => {
  let id = req.params.id
  tasks.map(task => {
    if (task.id === id) task.completionDate = 'Completed on ' + new Date()
  })
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})


router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  tasks = tasks.filter(elem => elem.id !== id)
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/completed')
})


module.exports = router