const { Schema, model } = require('mongoose')

const speciesSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Species', speciesSchema)