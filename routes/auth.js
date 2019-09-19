const router = require('express').Router()
const passport = require('../config/passport')
const User = require('../models/User')
const Profile = require('../models/Profile')
const Refugee = require('../models/Refugee')

// ############# Signup
router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
  // try {
  const { name, lastName, email, refugee } = req.body
  let refugeeData = ''
  let role = 'ADOPTER'
  //const user = await User.register({ email }, req.body.password) // 1er arg: todo lo que será el registro, 2o arg: lo que quiero que sea el password
  const user = await User.register({ email }, req.body.password) //, async function (err, user) {
  // if (err) {
  //   console.log(err);
  //   return res.render('signup', { error: true, message: 'Ha ocurrido un error, intenta nuevamente :(' });
  // } else {
  //   await passport.authenticate('local')(req, res, function () {
  //     res.redirect('/signup/success');
  //   });
  // }
  //});
  // });
  if (refugee) {
    role = 'REPRESENT'
    const { refugeeName, refugeeStreet, refugeeStreetNumber, refugeeSuburb, refugeeCity, refugeeCountry } = req.body
    refugeeData = {
      name: refugeeName,
      address: {
        street: refugeeStreet,
        streetNumber: refugeeStreetNumber,
        suburb: refugeeSuburb,
        city: refugeeCity,
        country: refugeeCountry
      }
    }
    await Refugee.create({ represent: user.id, refugeeData })
  }
  await Profile.create({ name, lastName, user: user._id, role })
  res.redirect('/signup/success')
  // }
  // catch (e) {
  //   await User.findByIdAndDelete(req.user.id)
  //   res.send('El usuario ya existe ' + e)
  // }
})

router.get('/signup/success', (req, res, next) => {
  // TODO: Traer user_id desde ruta anterior
  console.log("user en success:" + Object.keys(req.session.cookie))
  res.render('signup-success', {
    name: req.user.profile.name, _email: req.user.email,
  })
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