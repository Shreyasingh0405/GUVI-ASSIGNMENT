/* eslint-disable camelcase */
const userModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const signup = async (req, res) => {
  try {
    const user_data = req.body

    if (Object.keys(user_data).length === 0) { return res.send({ status: 1, response: 'invalid request' }) }

    user_data.password = bcrypt.hashSync(user_data.password, 10)

    const mail = await userModel.findOne({ email: user_data.email })
    if (mail) return res.send({ status: 1, message: 'EmailId Already Registered ' })

    const create = await userModel.create(user_data)
    return res.send({ status: 1, message: 'User Created Successfully', data: create })
  } catch (error) {
    return res.send({ status: 0, msg: error.message })
  }
}
const Login = async (req, res) => {
  try {
    const body = req.body
    const { email, password } = body
    if ((Object.keys(body).length === 0)) {
      return res.send({ status: 0, message: 'invalid request' })
    }
    const user = await userModel.findOne({ email, status: 1 })
    if (user) {
      const Passwordmatch = bcrypt.compareSync(password, user.password)
      if (Passwordmatch) {
        const generatedToken = jwt.sign({
          userId: user._id,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600
        }, 'iitm')
        res.setHeader('Authorization', 'Bearer ' + generatedToken)
        return res.send({
          status: 1,
          message: 'User login successfull', // " user loggedIn Succesfully ✔🟢"
          data: {
            userId: user._id,
            token: generatedToken
          }
        })
      } else {
        res.send({ status: 0, message: 'Password Is Inappropriate.' })
      }
    } else {
      return res.send({ status: 0, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    return res.send({ status: 0, message: error.message })
  }
}
function findDocuments (collection, filter, options) {
  return collection.find(filter, options)
}

const getUser = async (req, res) => {
  try {
    const get_userdata = await findDocuments(userModel, { }, { email: 1, _id: 0 })
    return res.send({ status: 1, message: 'Userdata found sucessfully', data: get_userdata })
  } catch (error) {
    return res.send({ status: 0, message: error.message })
  }
}
const updateUser = async (req, res) => {
  try {
    const user_data = req.body

    if (Object.keys(user_data).length === 0) { return res.send({ status: 1, response: 'invalid request' }) }

    user_data.password = bcrypt.hashSync(user_data.password, 10)

    const mail = await userModel.findOne({ email: user_data.email })
    if (mail) return res.send({ status: 1, message: 'EmailId Already Registered ' })

    const create = await userModel.updateOne({_id:(user_data._id)},user_data)
    return res.send({ status: 1, message: 'User Created Successfully', data: create })
  } catch (error) {
    return res.send({ status: 0, msg: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId
    if (!mongoose.isValidObjectId(userId)) {
      return res.send({ status: 0, message: 'Invalid userId' })
    }
    const data = await userModel.findOne({ _id: userId, status: 1 })
    if (!data) {
      return res.send({ status: 0, message: 'userid not exist or deleted' })
    }
    await userModel.findOneAndUpdate({ _id: userId }, { status: 0, deletedAt: Date() }, { new: true })

    return res.send({ status: 1, message: 'Deleted Sucessfully.' })
  } catch (error) {
    return res.send({ status: 0, message: error.message })
  }
}


module.exports = { signup, Login, getUser, deleteUser ,updateUser}
