const passport = require('passport') // Importamos passport
const User = require('../models/User')

// Leer la learning para entender todo esto...
passport.use(User.createStrategy()) // 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport