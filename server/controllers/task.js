const Mission = require('../models/mission')

module.exports = {
    //Edits a the selected task in the mission  
    editTask: async (req, res) => {
        try {
            await Mission.findOneAndUpdate({ _id: req.body.id }, {
                $set: { 'tasks.$[i].task': req.body.task }
            }, {
                arrayFilters: [{ 'i.task': req.body.oldTask }]
            })
            console.log('Task edited')
            res.json({ message: 'Task edited' })
        } catch (err) {
            console.log('Task edit unsuccessful')
        }
    },
    //Deletes a task in mission  
    deleteTask: async (req, res) => {
        try {
            await Mission.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { tasks: { task: req.params.task } }
            }, {
                multi: true
            })
            console.log('Task deleted')
            res.json({ message: 'Task deleted' })
        } catch (err) {
            console.log(err)
        }
    },
    //Marks task in mission as completed: true in DB
    markComplete: async (req, res) => {
        //console.log( req.body.missionIdFromJSFile)
        console.log(req.body)
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
    //Marks task in mission as completed: false in DB
    markIncomplete: async (req, res) => {
        console.log(req.body)
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
    },

    //Adds a new task to the mission
    addTask: async (req, res) => {
        console.log(req.body)
        try {
            await Mission.findOneAndUpdate({ _id: req.body.id }, {
                $push: { tasks: { task: req.body.task, completed: false } }
            })
            console.log('task add')
            res.redirect("/missions")
        } catch (err) {
            res.redirect("/missions");
        }

    }
}