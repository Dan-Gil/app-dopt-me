// const express = require('express')
const router = require('express').Router()
const passport = require('../config/passport')
const User = require('../models/User')
// const ensureLogin = require('connect-ensure-login')

// ############# Signup
router.get('/signup', (req, res, next) => {
  res.render('auth/signup') //Reutilizando vistas
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body }, req.body.password) // 1er arg: todo lo que será el registro, 2o arg: lo que quiero que sea el password
    console.log(user)
    res.redirect('/login')
  }
  catch (e) {
    res.send('El usuario ya existe')
  }
})

// ########### Login
router.get('/login', (req, res, next) => {
  if (req.query.loginFail == 'true') {
    res.render('auth/login', { loginFail: true })
  } else {
    res.render('auth/login')
  }
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login?loginFail=true' }), (req, res, next) => {
  console.log(req.user, req.session)
  res.render('/auth/profile')
})

// ########### Forgot
router.get('/forgot', (req, res, next) => {
  res.render('auth/forgot')
})

// ########### Profile
router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('auth/profile', { user: req.user })
})

// ########### Logout
router.get('/logout', (req, res, next) => {
  req.logout() // Se finaliza la sesión
  res.redirect('/login')
})

// ########### Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    next()
  else
    res.redirect('/login')
}

module.exports = router