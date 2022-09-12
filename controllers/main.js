const Mission = require('../models/mission')

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    },
    getWelcome: async (req, res) => {
        res.render('welcome_page.ejs', {user: req.user})
    },
    getMissions: async (req,res)=>{
        try{
            const missionItems = await Mission.find({userId:req.user.id})
            res.render('current_missions.ejs', {missions: missionItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getCreation: (req, res) => {
        res.render('mission_creations.ejs')
    }
}