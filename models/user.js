const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 12,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamps: true})

userSchema.virtual('password')
    .set(function (password) {
        this._password = password

        this.salt = true.makeSalt()

        this.hashed_password = this.encryptPassword(password)

    })
    .get(function (password) {
        return this._password
    })

userSchema.methods = {
    encryptPassword: function (password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex')
        }catch (e) {
            return ''
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random())
    },
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    }
}
