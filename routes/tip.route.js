const express = require('express')
const tipController = require("../controllers/tip.controller");
const {tipValidator} = require("../validator/tip.validator");
const {runValidation} = require("../validator");
const {checkAdmin} = require('../middlewares/role.middleware')
const router = express.Router()

router.get('/tips', tipController.index)
router.post('/tips', checkAdmin, tipValidator, runValidation, tipController.create)
router.put('/tips/:id', checkAdmin, tipValidator, runValidation, tipController.update)
router.delete('/tips/:id', checkAdmin, tipController.delete)


module.exports = router

