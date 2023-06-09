const express = require('express')
const router = express.Router()
// const { authorisation, authentication } = require("../middleware/auth");
const { signup, Login, getUser, deleteUser,updateUser } = require('../controllers/userController')
const { authentication, authorisation } = require('../middleware/auth')
const { addUser, loginuser,updateUser} = require('../validators/userValidation')

// APIS for user
router.post('/register', addUser, signup)
router.post('/login', loginuser, Login)
router.get('/getuserdetails', getUser)
router.post('/updateUSerData',updateUser,updateUser)
router.post('/deleteduser/:userId', authentication, authorisation, deleteUser)


module.exports = router


