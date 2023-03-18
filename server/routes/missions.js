/*  Grouped all the routes which are  
    involve anything related to missions
*/
const express = require('express')
const router = express.Router()
const missionsController = require('../controllers/missions') 
const { ensureAuth } = require('../middleware/auth')

//Routes that involve task items
router.put('/markComplete', missionsController.markComplete)
router.put('/markIncomplete', missionsController.markIncomplete)
router.delete('/deleteTask', missionsController.deleteTask)
router.put('/editTask', missionsController.editTask)
router.post('/addTask', missionsController.addTask)

//Routes that involve mission items
router.post('/createMission', missionsController.createMission)
router.delete('/deleteMission', missionsController.deleteMission)
router.put('/editMission', missionsController.editMission)

module.exports = router
