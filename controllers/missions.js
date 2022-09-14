const Mission = require('../models/mission')

module.exports = {
    //Create a mission, with task
    createMission: async (req, res) => {
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
    //Marks task in mission as completed: true in DB
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
    //Marks task in mission as completed: false in DB
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
    },
    //Deletes a task in mission  
    deleteTask: async (req, res) => {
        try {
            await Mission.findOneAndUpdate({ _id: req.body.missionIdFromJSFile }, {
                $pull: { tasks: { task: req.body.task } }
            }, {
                multi: true
            })
            console.log('Deleted mission task')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    },
    //Delete the whole mission  
    deleteMission: async (req, res)=>{
        console.log(req.body.missionIdFromJSFile)
        try{
            await Mission.findOneAndDelete({_id:req.body.missionIdFromJSFile})
            console.log('Deleted Mission')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}
//extra --> edit mission