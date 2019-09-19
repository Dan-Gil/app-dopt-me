const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');


  // res.redirect('/login')

});

router.get('/contacto', (req, res) => {
  res.render('contacto');
});

router.get('/citas', (req, res) => {
  res.render('cita');
});

router.get('/albergues', (req, res, next) => {
  Place.find().then(places => {
    console.log(places);
    res.render('albergues', {places});
  });
});

router.get('/donaciones', (req, res) => {
  res.render('donaciones');
});

router.get('/cita', (req, res) => {
  res.render('cita');
});

router.get('/adopta', (req, res) => {
  res.render('adopta');
});

module.exports = router;
