const { Schema, model } = require('mongoose')

const refugeeSchema = new Schema(
  {
    name: String,
    represent: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    address: {
      street: String,
      streetNumber: String,
      suburb: String,
      zipCode: Number,
      city: String,
      state: String,
      country: String,
    },
    refugeePhotos: [
      {
        url: String,
        name: String
      }
    ],
    pets: [
      {
        pet: {
          ref: 'Pet',
          type: Schema.Types.ObjectId
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Refugee', refugeeSchema)

