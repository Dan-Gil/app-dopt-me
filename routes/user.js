const express = require('express')
const router = express.Router()
const Refugee = require('../models/Refugee')
const uploadCloud= require('../config/cloudinary')

module.exports = router;

router.get('/adoptables/add', (req, res) => {
    res.render('adoptables');
});


router.post('/adoptables/add', uploadCloud.single('photo'), async (req, res) => {
    const {title, description} = req.body;
    const {url: imgPath, originalname: imgName} = req.file;
    await Refugee.create({title, description, imgPath, imgName});
    res.redirect('/adoptables');
});
module.exports = router;
