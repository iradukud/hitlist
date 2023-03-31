/*  Grouped all the routes which are  
    involve anything related to missions
*/
const express = require('express')
const router = express.Router()
const missionsController = require('../controllers/mission')

//Mission routes
router.get('/missions', missionsController.getMissions)
router.post('/create', missionsController.createMission)
router.put('/editMission', missionsController.editMission)
router.delete('/deleteMission/:id', missionsController.deleteMission)

module.exports = router