const express = require('express')
const router = express.Router()
const jsonfile = require('jsonfile')

var fileName = './src/data/tasks.json'
var tasks = jsonfile.readFileSync(fileName)

router.get('/:id', function deleteTask(req, res) {
  let id = req.params.id
  let message = "Item removed"
  tasks = tasks.filter(elem => elem.id !== id)
  jsonfile.writeFile(fileName, tasks, {spaces:2}, function (err) {
    if (err) return console.log(err)
  })
  res.redirect('/')
})



module.exports = router