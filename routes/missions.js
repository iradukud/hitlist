const express = require('express')
const router = express.Router()
const missionsController = require('../controllers/missions') 
const { ensureAuth } = require('../middleware/auth')

router.post('/createMission', missionsController.createMission)
router.put('/markComplete', missionsController.markComplete)
router.put('/markIncomplete', missionsController.markIncomplete)
router.delete('/deleteTask', missionsController.deleteTask)
router.delete('/deleteMission', missionsController.deleteMission)


module.exports = router
