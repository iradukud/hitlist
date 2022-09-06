module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    },
    getWelcome: (req, res) => {
        res.render('welcome_page.ejs')
    },
    getMissions: (req, res) => {
        res.render('current_missions.ejs')
    },
    getCreation: (req, res) => {
        res.render('mission_creations.ejs')
    }
}