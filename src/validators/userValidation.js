const { check, validationResult } = require('express-validator')

const addUser =
    [
      check('fullName').notEmpty().withMessage('fullName cannot be empty'),
      check('Designation').notEmpty().withMessage('Designation cannot be empty'),
      check('email').notEmpty().withMessage('Email cannot be empty'),
      check('mobile').notEmpty().withMessage('Phone cannot be empty'),
      check('password').notEmpty().withMessage('Password cannot be empty'),
      check('dob').notEmpty().withMessage('dob cannot be empty'),
      check('age').notEmpty().withMessage('age cannot be empty'),
      (req, res, next) => {
        const errors = validationResult(req).array()
        if (errors.length > 0) {
          return res.send({ status: 0, response: errors[0].msg })
        }
        return next()
      }
    ]
const loginuser =
    [
      check('email').notEmpty().withMessage('Email cannot be empty'),
      check('password').notEmpty().withMessage('Password cannot be empty'),
      (req, res, next) => {
        const errors = validationResult(req).array()
        if (errors.length > 0) {
          return res.send({ status: 0, response: errors[0].msg })
        }
        return next()
      }
    ]
    const updateUser =
    [
      check('id').notEmpty().withMessage('id cannot be empty'),
      check('fullName').notEmpty().withMessage('fullName cannot be empty'),
      check('Designation').notEmpty().withMessage('Designation cannot be empty'),
      check('email').notEmpty().withMessage('Email cannot be empty'),
      check('mobile').notEmpty().withMessage('Phone cannot be empty'),
      check('password').notEmpty().withMessage('Password cannot be empty'),
      check('dob').notEmpty().withMessage('dob cannot be empty'),
      check('age').notEmpty().withMessage('age cannot be empty'),
      (req, res, next) => {
        const errors = validationResult(req).array()
        if (errors.length > 0) {
          return res.send({ status: 0, response: errors[0].msg })
        }
        return next()
      }
    ]
module.exports = { addUser, loginuser ,updateUser}
