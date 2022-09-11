const express = require('express')
const router = express.Router()
const missionsController = require('../controllers/missions') 
const { ensureAuth } = require('../middleware/auth')

router.post('/createMission', missionsController.createMission)






module.exports = router
//router.get('/', ensureAuth, todosController.getTodos)

//router.put('/markComplete', todosController.markComplete)

//router.put('/markIncomplete', todosController.markIncomplete)

//router.delete('/deleteMission', todosController.deleteTodo)

//module.exports = router