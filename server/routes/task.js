const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/task')

//Routes that involve task items
router.put('/markCompletion', tasksController.markComplete)
router.delete('/delete/:id/:task', tasksController.deleteTask)
router.put('/edit', tasksController.editTask)
router.post('/add', tasksController.addTask)

module.exports = router