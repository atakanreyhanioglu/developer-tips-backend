const express = require('express')
const router = express.Router()

const {userRegisterValidator} = require('../validator/auth.validator')
const {runValidation} = require('../validator')

const {register, registerActivation} = require('../controllers/auth.controller')

router.post('/register', userRegisterValidator, runValidation, register)
router.post('/register/activate', registerActivation)


module.exports = router
