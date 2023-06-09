const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userModel = require('../models/UserModel')

module.exports.authentication = async function (req, res, next) {
  try {
    let token = req.headers.authorization
    if (!token) {
      return res.send({ status: 0, message: 'Missing authentication token in request' })
    }
    token = token.substring(7)
    const decoded = jwt.decode(token)
    if (!decoded) {
      return res.send({ status: 0, message: 'Invalid authentication token in request headers.' })
    }
    if (Date.now() > (decoded.exp) * 3600) {
      return res.send({ status: 0, message: 'Session expired! Please login again.' })
    }
    jwt.verify(token, 'Dokonaly', function (err, decoded) {
      if (err) {
        return res.send({ status: 0, message: 'token invalid' })
      } else {
        req.userId = decoded.userId
        req.token = decoded
        return next()
      }
    })
  } catch (error) {
    res.send({ status: 0, message: error.message })
  }
}
// ------------------------------------Authorisation----------------------------------------------------------------//
module.exports.authorisation = async function (req, res, next) { // userId from params
  try {
    const userId = req.params.userId
    if (!userId) return res.send({ status: 0, message: 'enter user id in url' })// handled by postman as well
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.send({ status: 0, message: 'enter a valid user id in url path' })

    const user = await userModel.findById(userId)
    if (!user) return res.send({ status: 0, message: 'user does not exist' }) // new changes added

    const loggedInUserId = req.token.userId
    if (loggedInUserId !== userId) return res.send({ status: 0, message: `user ${loggedInUserId} is not authorised to make changes in ${userId}` })
    next()
  } catch (err) {
    console.log(err)
    return res.send({ status: 0, message: err.message })
  }
}
