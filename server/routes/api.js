/*  Grouped all the routes which are  
    used to generate a page
*/
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')



//Routes that deal with logining in
router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)


module.exports = router