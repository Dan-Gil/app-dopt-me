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
        name: String,
        species: {
          ref: 'Species',
          type: Schema.Types.ObjectId
        },
        race: String,
        photos: [
          {
            url: String,
            name: String
          }
        ],
        owner: {
          ref: 'User',
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

