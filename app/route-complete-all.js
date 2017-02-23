const express = require('express')
const router = express.Router()
const jsonfile = require('jsonfile')

var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)

router.get('/', (req, res) => {
  tasks.map(task => {
    task.completionDate = 'Completed on ' + new Date()
  })
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})

module.exports = router

