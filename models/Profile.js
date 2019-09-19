const { Schema, model } = require('mongoose')

const profileSchema = new Schema(
  {
    name: String,
    lastName: String,
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    role: {
      type: String,
      enum: ['ADMIN', 'REPRESENT', 'ADOPTER'],
      default: 'ADOPTER'
    },
    street: String,
    streetNumber: String,
    suburb: String,
    zipCode: Number,
    city: String,
    state: String,
    country: String,
    profilePic: String,
    profilePicPath: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Profile', profileSchema)