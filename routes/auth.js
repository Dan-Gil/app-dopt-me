const router = require('express').Router()
const passport = require('../config/passport')
const User = require('../models/User')
const Profile = require('../models/Profile')
const Refugee = require('../models/Refugee')
const nodemailer = require('nodemailer')

// ############# Signup
router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
  const { name, lastName, email, refugee } = req.body
  let refugeeData = ''
  let html = ''
  let role = 'ADOPTER'
  const user = await User.register({ email }, req.body.password) //, async function (err, user) {

  if (refugee) {
    role = 'REPRESENT'
    const { refugeeName, refugeeStreet, refugeeStreetNumber, refugeeSuburb, refugeeCity, refugeeCountry } = req.body
    // refugeeData = {
    //   name: refugeeName,
    //   address: {
    //     street: refugeeStreet,
    //     streetNumber: refugeeStreetNumber,
    //     suburb: refugeeSuburb,
    //     city: refugeeCity,
    //     country: refugeeCountry
    //   }
    // }
    console.log("refugeeData: " + refugeeData)
    await Refugee.create({ represent: user.id, refugeeName, address: { street: refugeeStreet, streetNumber: refugeeStreetNumber, suburb: refugeeSuburb, city: refugeeCity, country: refugeeCountry } })
  }
  const profile = await Profile.create({ name, lastName, user: user._id, role })

  // ############# Email send
  const confirmCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const port = req.app.settings.port || process.env.PORT;
  const host = req.protocol + '://' + req.hostname + (port == 80 || port == 443 ? '' : ':' + port);

  if (refugee) {
    html = `
    <!DOCTYPE html>
    <html>

    <head>
    </head>

    <body>
    <h2>Bienvenido a App-dopt-me</h2>
    <p>¡Hola ${profile.name}!</p>
    <p>Tu registro en App-dopt-me está casi finalizado...</p>
    <p>Sólo haz click en el siguiente enlace para activar tu cuenta y podrás empezar a publicar información sobre tu refugio.</p>
    <a href="${host}/auth/confirm/${confirmCode}">${host}/auth/confirm/${confirmCode}</a>
    <br>
    <p>¡Gracias por unirte a nuestra comunidad!</p>
    <br><br>
    img src="https://res.cloudinary.com/app-cdn/image/upload/v1568914888/imgs/App-Dopt-Me_Logo_yp9ylc.png"
    <p>- El equipo de App-dopt-me</p>
    </body>
    </html>
    `
  } else {
    html = `
    <!DOCTYPE html>
    <html>

    <head>
    </head>

    <body>
      <h2>Bienvenido a App-dopt-me</h2>
      <p>¡Hola ${profile.name}!</p>
      <p>Tu registro en App-dopt-me está casi finalizado...</p>
      <p>Sólo haz click en el siguiente enlace para activar tu cuenta
        y podrás empezar a buscar a tu compañero ideal.</p>
      <a href="${host}/auth/confirm/${confirmCode}">${host}/auth/confirm/${confirmCode}</a>
      <br>
      <p>¡Gracias por unirte a nuestra comunidad!</p>
      <br><br>
      <img src="https://res.cloudinary.com/app-cdn/image/upload/v1568914888/imgs/App-Dopt-Me_Logo_yp9ylc.png"
        alt="app-dopt-me-logo" width="80px">
      <p><i class="fas fa-paw"></i>- El equipo de App-dopt-me</p>
    </body>
    </html>
    `
  }

  const userConfirmCode = User.findOneAndUpdate({ _id: user._id }, { confirmCode }, async (err, doc) => {
    if (!err) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
      })

      const info = await transporter.sendMail({
        from: `App-dopt-me <${process.env.EMAIL}>`,
        to: email,
        subject: 'App-dopt-me: Verificación de email',
        text: `Please enter to the following link for account verification: ${host}/auth/confirm/${confirmCode}`,
        html
      })
      res.render('auth/signup-success', { name: profile.name, email: user.email })

    }
    else {
      res.render("auth/signup", { message: "Something went wrong: " + err, error: true });
    }
  })
})

router.get('/auth/confirm/:confirmCode', async (req, res, next) => {
  const { confirmCode } = req.params
  await User.findOneAndUpdate({ confirmCode }, { confirmCode: null }, async (err, user) => {

    if (user === null) {
      res.render('auth/email-verification', { message: 'The validation key is invalid!', validation: false });
      return
    }
    user.status = 'ACTIVE'
    const { name } = await Profile.findOne({ user: user._id })
    await user.save(err => {
      if (err) {
        res.render('auth/email-verification', { title: '¡Oh, no!', message: `Hubo un problema al activar tu cuenta: ${err}`, validation: false })
        return
      }
      res.render('auth/email-verification', { title: '¡Activación exitosa!', message: `Hola ${name}, se ha activado tu cuenta satisfactoriamente, puedes ingresar a tu perfil desde <a href="/login">aquí.</a>`, validation: true })
    })
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
  res.redirect('/profile')
})

// ########### Forgot
router.get('/forgot', (req, res, next) => {
  res.render('auth/forgot')
})

router.post('/forgot', async (req, res, next) => {
  const confirmCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const port = req.app.settings.port || process.env.PORT;
  const host = req.protocol + '://' + req.hostname + (port == 80 || port == 443 ? '' : ':' + port);
  const { email } = req.body
  console.log("email:" + email)
  const user = await User.findOneAndUpdate({ email }, { confirmCode })
  console.log('user' + user)
  const profile = await Profile.findOne({ user: user._id })
  console.log("Profile:" + profile)
  const html = `
    <!DOCTYPE html>
    <html>

    <head>
    </head>

    <body>
      <h2>Recuperación de contraseña</h2>
      <p>¡Hola ${profile.name}!</p>
      <p>Has recibido este mensaje porque solicitaste un cambio de contraseña.</p>
      <p>Haz click en el siguiente enlace para cambiarla:</p>
      <a href="${host}/forgot/confirm/${confirmCode}">${host}/forgot/confirm/${confirmCode}</a>
      <br><br>
      <img src="https://res.cloudinary.com/app-cdn/image/upload/v1568914888/imgs/App-Dopt-Me_Logo_yp9ylc.png"
        alt="app-dopt-me-logo" width="80px">
      <p><i class="fas fa-paw"></i>- El equipo de App-dopt-me</p>
    </body>
    </html>
    `
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  })

  const info = await transporter.sendMail({
    from: `App-dopt-me <${process.env.EMAIL}>`,
    to: email,
    subject: 'App-dopt-me: Reinicio de contraseña',
    text: `Has recibido este correo porque solicitaste un reinicio de contraseña.
    Copia y pega este enlace en una ventana nueva de tu navegador: ${host}/forgot/confirm/${confirmCode}
    - El equipo de App-dopt-me`,
    html
  })
  res.render('auth/forgot-success', { name: profile.name, email: user.email })
})

router.get('/forgot/confirm/:id', async (req, res, next) => {
  const { id } = req.params
  const user = await User.findOne({ confirmCode: id })
  if (user === null) {
    res.render('auth/email-verification', { title: '¡Ha ocurrido un error!', message: 'Código de confirmación inválido' })
    return
  }
  res.render('auth/password-reset', { email: user.email, id })
})

router.post('/forgot/confirm/:id', async (req, res, next) => {
  const { password } = req.body
  const { id } = req.params
  const user = await User.findOne({ confirmCode: id })
  console.log('user:' + user)
  user.setPassword(password, function () {
    user.confirmCode = null
    user.save();
    res.redirect('/login')
  });
})

// ########### Profile
router.get('/profile', isLoggedIn, async (req, res, next) => {
  const { user } = req
  const { name, lastName } = await Profile.findOne({ user: user.id })
  res.render('auth/profile', { name, lastName })
  // console.log((pets[0]._doc.name))
})

router.post('/refugee/find/pets', async (req, res, next) => {
  const { petName } = req.body
  const { user } = req
  console.log("petname:" + petName)
  const { pets } = await Refugee.findOne({ represent: user.id }).populate('pet')
  let pet = ''
  console.log(pets)
  for (let i = 0; i < pets.length; i++) {
    if (pets[i]._doc.name === petName) {
      pet = pets[i]._doc
      break
    }
  }
  let perro = false
  let gato = false
  console.log(pet)
  if (pet.species === 'Perro') perro = true
  else if (pet.species === 'Gato') gato = true
  if (perro) { res.render('auth/profile', { pet, perro }) }
  else if (gato) { res.render('auth/profile', { pet, gato }) }
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