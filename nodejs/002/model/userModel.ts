import mongoose from 'mongoose'
import validator from 'validator'
import { hash, compare } from 'bcryptjs'
import { createHash, randomBytes } from 'crypto'

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    maxlength: 15
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: validator.isEmail
  },
  password: {
    required: true,
    type: String,
    select: false,
    validate: validator.isStrongPassword
  },
  age: {
    type: Number,
    min: 10,
    max: 150
  },
  passwordChangeAt: {
    type: Date
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'creator'],
    default: 'user'
  },
  passwordResetToken: String,
  passwordResetExpires: Date
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await hash(this.password, 12)
  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next()
  }
  this.passwordChangeAt = Date.now()
  next()
})

userSchema.methods.isPasswordRight = async function (
  password: string,
  validatePassword: string
) {
  const ret = await compare(password, validatePassword)
  return ret
}

userSchema.methods.isPasswordExpired = function (JwtTimeStamp: number) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = this.passwordChangeAt.getTime() / 1000
    return JwtTimeStamp < changeTimeStamp
  }
  return false
}

userSchema.methods.createPasswordFrogetToken = function () {
  const resetToken = randomBytes(32).toString('hex')
  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

export const userModel = mongoose.model('users', userSchema)
