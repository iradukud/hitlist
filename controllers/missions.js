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
                    return { 'task': x.trim(), 'completed': false }
                }),
                userId: req.user.id
            })
            console.log('Mission has been added!')
            res.redirect('/create')
        } catch (err) {
            console.log(err)
        }
    },
    //Marks mission as completed: true in DB
    markComplete: async (req, res) => {
        //console.log( req.body.missionIdFromJSFile)
        //console.log( req.body.task)
        try {
            await Mission.findOneAndUpdate({ _id: req.body.missionIdFromJSFile }, {
                $set: { 'tasks.$[i].completed': true }
            }, {
                arrayFilters: [{ 'i.task': req.body.task }]
            })
            console.log('Marked Complete')
            res.json('Marked complete')
        } catch (err) {
            console.log(err)
        }
    },
    //Marks mission as completed: true in DB
    markIncomplete: async (req, res) => {
        try {
            await Mission.findOneAndUpdate({ _id: req.body.missionIdFromJSFile }, {
                $set: { 'tasks.$[i].completed': false }
            }, {
                arrayFilters: [{ 'i.task': req.body.task }]
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch (err) {
            console.log(err)
        }
    }
}





//delete mission

//extra --> edit mission