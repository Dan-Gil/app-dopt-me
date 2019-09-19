require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('./config/passport') // Se importa el passport configurado en ./config/passport
const session = require('express-session') //  Importamos el manejador de sesiones de express

mongoose
  // .connect('mongodb+srv://dan:1234@cluster0-f894s.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .connect('mongodb://localhost/app-dopt-me', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Session setup
app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  secret: process.env.SECRET
})
)

// Passport Setup
app.use(passport.initialize()) // Primero se inicializa
app.use(passport.session()) // Después se inicia la sesión

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'App-dopt-me - ¡Bienvenido!';



const index = require('./routes/index');
const auth = require('./routes/auth') // Se agrega la nueva ruta
app.use('/', auth) //  Se agrega el prefijo 'auth' para que la ruta 'auth' lo maneje
app.use('/', index);


module.exports = app;
