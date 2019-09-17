const New = require('../models/Pet')

exports.getNews = async (req, res, next) => {
  const news = await New.find().populate('author')
  res.render('news/news', { news, user: req.user })
}

exports.createNew = async (req, res, next) => {
  const { title, body } = req.body
  const { _id } = req.user

  await New.create({ title, body, author: _id })
  res.redirect('/news')
}

exports.createNewForm = (req, res) => {
  res.render('news/create-new')
}

exports.deleteNew = async (req, res, next) => {
  const { id } = req.params
  await New.findByIdAndDelete(id)

  res.redirect('/news')
}