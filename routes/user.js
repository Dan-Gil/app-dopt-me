const express = require('express')
const router = express.Router()
const Refugee = require('../models/Refugee')
const Pet = require('../models/Pet')
const Species = require('../models/Species')
const uploadCloud = require('../config/cloudinary')

// ############### Vista mascotas por albergue
router.get('/albergues/:id', (req, res, next) => {
    const { id } = req.params
    const { name, pets, refugeePhotos } = Refugee.findOne(id)
    res.render('adoptables', { name, pets, refugeePhotos })
    console.log("=========== " + name, pets, refugeePhotos)
})


router.get('/adoptables/add', (req, res) => {
    res.render('adoptables');
});

router.post('/refugee/uploads/photos', uploadCloud.single('photo'), async (req, res) => {
    const { url, name: originalname } = req.file;
    await Refugee.findOneAndUpdate({ represent: req.user.id }, { $push: { refugeePhotos: { url, name: originalname } } });
    res.redirect('/profile');
});

router.post('/refugee/uploads/pets', uploadCloud.single('photo'), async (req, res) => {
    const { url, originalname } = req.file;
    console.log("name: " + originalname + "url:" + url)
    const { name, breed, species } = req.body
    const speciesName = await Species.findOne({ name: species })
    const pet = await Pet.create({ name, breed, species: speciesName._id })
    await Pet.findByIdAndUpdate({ _id: pet._id }, { $push: { photos: { url, name: originalname } } })
    await Refugee.findOneAndUpdate({ represent: req.user.id }, { $push: { pets: { pet: pet._id } } });
    res.redirect('/profile');
});



module.exports = router;
