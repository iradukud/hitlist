const mongoose = require('mongoose');
const Mission = require('../models/mission')

module.exports = {
    //Adds a new task to the mission
    addTask: async (req, res) => {
        try {
            await Mission.findOneAndUpdate({ _id: req.body.id }, {
                $push: { tasks: { task: req.body.task, completed: false } }
            })
            console.log('Task added')
            res.json({ message: 'Task added' })
        } catch (err) {
            console.log('Task addition unsuccessful')
        }
    },
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
    markCompletion: async (req, res) => {
        try {
            const mission = await Mission.findById({ _id: mongoose.Types.ObjectId(req.body.id) })

            if (mission['tasks'].filter((obj) => obj['task'] == req.body.task)[0]['completed']) {
                await Mission.findOneAndUpdate({ _id: req.body.id }, {
                    $set: { 'tasks.$[i].completed': false }
                }, {
                    arrayFilters: [{ 'i.task': req.body.task }]
                })
                console.log('Task uncompleted')
            } else {
                await Mission.findOneAndUpdate({ _id: req.body.id }, {
                    $set: { 'tasks.$[i].completed': true }
                }, {
                    arrayFilters: [{ 'i.task': req.body.task }]
                })
                console.log('Task completed')
            }
            res.json({ message: 'Task completion status changed' })
        } catch (err) {
            console.log(err)
        }
    },
}