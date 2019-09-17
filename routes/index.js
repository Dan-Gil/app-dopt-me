const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/contacto', (req, res) => {
  res.render('contacto');
});

router.get('/citas', (req, res) => {
  res.render('cita');
});

module.exports = router;
