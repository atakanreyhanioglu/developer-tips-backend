const User = require('../models/user');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { registerEmailParams } = require('../helpers/email');
const shortId = require('shortid')

AWS.config.update({
     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.login = (req, res) => {
     const {email, password} = req.body
     User.findOne({email}).exec((err, user) => {
          if(err || !user) {
               return res.status(400).json({
                    error: 'User not found.'
               })
          }
          if(!user.authenticate(password)) {
               return res.status(400).json({
                    error: 'Invalid password.'
               })
          }
          const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'},err)
          const {_id, name, email, role} = user

          return res.status(200).json({
               token, user: {_id, name, email, role}
          })

     })
}

exports.register = (req, res) => {
     // console.log('REGISTER CONTROLLER', req.body);
     const { name, email, password } = req.body;
     // check if user exists in our db
     User.findOne({ email }).exec((err, user) => {
          if (user) {
               return res.status(400).json({
                    error: 'Email is taken'
               });
          }
          // generate token with user name email and password
          const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
               expiresIn: '10m'
          }, err);

          // send email
          const params = registerEmailParams(email, token);

          const sendEmailOnRegister = ses.sendEmail(params).promise();

          sendEmailOnRegister
              .then(data => {
                   console.log('email submitted to SES', data);
                   res.json({
                        message: `Email has been sent to ${email}, Follow the instructions to complete your registration`
                   });
              })
              .catch(error => {
                   console.log('ses email on register', error);
                   res.status(401)
                   res.json({
                        error: `We could not verify your email. Please try again`
                   });
              });
     });
};
exports.registerActivation = (req, res) => {
     jwt.verify(req.body.token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
          if(err) {
               return res.status(401).json({
                    error: 'Your link is expired! Please try again.'
               })
          }
     }, (err) => console.log(err))
     const {name, email, password} = jwt.decode(req.body.token, {})
     const username = shortId.generate()
     User.findOne({email}).exec((err, user) => {
          if(user) {
               return res.status(401).json({
                    error: 'Email is taken.'
               })
          }

          const newUser = new User({username, name, email, password})
          newUser.save((err, result) => {
               if(err) {
                    return res.status(401).json({
                         error: 'User saving is failed.Try again later.'
                    })
               }
               return res.status(200).json({
                    message: 'Registration successful. Please login.'
               })
          })
     })
}
