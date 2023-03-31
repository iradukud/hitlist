const Mission = require('../models/mission')

module.exports = {
    //get all the user's missions
    getMissions: async (req, res) => {
        try {
            const missionItems = await Mission.find().lean()
            res.json({ missions: missionItems })
        } catch (err) {
            console.log(err)
        }
    },
    //Create a mission with tasks
    createMission: async (req, res) => {
        try {
            await Mission.create({
                mission: req.body.missionsName,
                date: req.body.date,
                importance: req.body.importance,
                tasks: req.body.tasks.split(',').map(x => {
                    return { 'task': x.trim(), 'completed': false }
                }),
                //userId: req.session.passport.user
            })
            console.log('Mission has been added!')
            res.json({ message: 'New mission created!' })
        } catch (err) {
            console.log(err)
        }
    },
    //Edits a mission name  
    editMission: async (req, res) => {
        try {
            await Mission.findOneAndUpdate({ _id: req.body['id'] }, {
                mission: req.body.missionsName,
                date: req.body.date,
                importance: req.body.importance
            })
            console.log('Mission edited')
            res.json({ message: 'Mission edited' });
        } catch (err) {
            console.log(err)
        }
    },
    //Delete the whole mission  
    deleteMission: async (req, res) => {
        console.log(req.params.idc)
        try {
            await Mission.findOneAndDelete({ _id: req.params.id })
            console.log('Deleted mission')
            res.json({ message: 'Deleted mission' })
        } catch (err) {
            console.log(err)
        }
    },
}