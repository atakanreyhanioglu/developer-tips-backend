const {check} = require('express-validator')

exports.tipValidator = [
    check('tags')
        .isArray({min: 1})
        .withMessage('At least 1 tag is required.'),
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required.'),
    check('content')
        .not()
        .isEmpty()
        .withMessage('Content is required.'),
]
