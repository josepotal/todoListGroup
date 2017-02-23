const express = require('express')
const router = express.Router()
const jsonfile = require('jsonfile')

var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)


router.get('/', function deleteAllToDo(req, res) {
  let auxTasks = tasks.filter(elem => {
    return elem.completionDate
  })
  jsonfile.writeFile(fileName, auxTasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})


module.exports = router