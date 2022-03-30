const express = require('express')
const router = express.Router()

const {userRegisterValidator} = require('../validator/auth.validator')
const {runValidation} = require('../validator')

const {register} = require('../controllers/auth.controller')

router.post('/register', userRegisterValidator, runValidation, register)

module.exports = router
