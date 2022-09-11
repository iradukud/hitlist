const Mission = require('../models/mission')

module.exports = {
    createMission: async (req, res) => {
        //Create a Mission
        try {
            await Mission.create({
                mission: req.body.mission,
                date: req.body.date,
                importance: req.body.importance,
                tasks: req.body.missionTasks.split(',').map(x => {
                    return { 'task': x, 'completed': false }
                }),
                userId: req.user.id
            })
            console.log('Mission has been added!')
            res.redirect('/create')
        } catch (err) {
            console.log(err)
        }
    }
}


//delete mission
//mission complete
//mission uncomplete

//extra --> edit mission