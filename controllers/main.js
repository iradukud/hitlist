const Mission = require('../models/mission')

module.exports = {
    //renders the main page (signip / login)
    getIndex: (req, res) => {
        res.render('index.ejs')
    },
    //renders the welcome page, which lets user decide where to proceed
    getWelcome: async (req, res) => {
        res.render('welcome_page.ejs', {user: req.user})
    },
    //renders the active mission page
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