const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')
const userSchema = new Schema(
  {
    email: String,
    name: String,
    lastName: String,
    role: {
      type: String,
      enum: ['GUEST', 'REFUGEE', 'ADMIN'],
      default: 'GUEST',
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACTIVE'],
      default: 'PENDING'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' }) // Indicamos que userSchema usará passport con el campo de nombre de usuario con el valor del 'campo'

module.exports = model('User', userSchema)
