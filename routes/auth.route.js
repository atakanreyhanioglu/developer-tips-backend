const express = require('express')
const router = express.Router()

const {userRegisterValidator, userLoginValidator} = require('../validator/auth.validator')
const {runValidation} = require('../validator')

const {register, registerActivation, login} = require('../controllers/auth.controller')

router.post('/register', userRegisterValidator, runValidation, register)
router.post('/register/activate', registerActivation)

router.post('/login', userLoginValidator, runValidation, login)



module.exports = router
