const { Schema, model } = require('mongoose')

const petSchema = new Schema(
  {
    name: String,
    species: {
      ref: 'Species',
      type: Schema.Types.ObjectId
    },
    breed: String,
    photos: [{ url: String, name: String }],
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  }
)

module.exports = model('Pet', petSchema)