/*  Grouped all the routes which are  
    used to generate a page
*/
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const mainController = require('../controllers/main')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Routes that deal with logining in
router.get('/', ensureAuth, mainController.getIndex)
router.get('/login', ensureAuth, authController.getLogin)
router.post('/login', ensureAuth, authController.postLogin)
router.get('/logout', ensureAuth, authController.logout)
router.get('/signup', ensureAuth, authController.getSignup)
router.post('/signup', ensureAuth, authController.postSignup)

//Routes that generate a page
router.get('/welcome', ensureAuth, mainController.getWelcome)
router.get('/create', ensureAuth, mainController.getCreation)
router.get('/missions', ensureAuth, mainController.getMissions)

module.exports = router
