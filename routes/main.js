const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const mainController = require('../controllers/main')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', mainController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

router.get('/welcome', ensureAuth, mainController.getWelcome)
router.get('/create', ensureAuth, mainController.getCreation)
router.get('/missions', ensureAuth, mainController.getMissions)

module.exports = router
