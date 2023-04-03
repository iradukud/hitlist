const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/task')

//Routes that involve task items
router.put('/add', tasksController.addTask)
router.put('/edit', tasksController.editTask)
router.delete('/delete/:id/:task', tasksController.deleteTask)
router.put('/markCompletion', tasksController.markComplete)

module.exports = router