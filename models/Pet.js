const { Schema, model } = require('mongoose')

const newSchema = new Schema(
  {
    name: String,
    race: String,
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  },
  {
    versionKey: false
  }
)

module.exports = model('New', newSchema)