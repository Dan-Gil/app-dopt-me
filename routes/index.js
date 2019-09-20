const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');


});

router.get('/contacto', (req, res) => {
  res.render('contacto');
});

router.post('/contacto')


router.get('/albergues', (req, res, next) => {
  Place.find().then(places => {
    // console.log(places);
    res.render('albergues', { places });
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

router.get('/adoptables', (req, res) => {
  res.render('adoptables');
});

/*router.get('/adoptables/:id', async (req, res,next) => {
  const albergues = await Place.findOneById({_id: req.params.id});
  console.log(albergues)
  res.render('adoptables');
});*/









module.exports = router;
