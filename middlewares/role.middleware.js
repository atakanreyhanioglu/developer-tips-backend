const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = {
    checkAdmin: async (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1]
        const {_id} = jwt.decode(token, {})
        const user = await User.findOne({_id})
        if(user.role !== 'admin') {
            return res.status(401).json({status: 'error', msg: 'No permission.'})
        }
        next()
    }
}
