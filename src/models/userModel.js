const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  Designation: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    trim: true
  },
  Dob: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('User', userSchema)
