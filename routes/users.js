const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');

//REGISTER ROUTES
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


//LOGIN ROUTES
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(users.login));
    
router.get('/logout', users.logout);


module.exports = router;