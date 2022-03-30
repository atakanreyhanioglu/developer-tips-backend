const {validationResult} = require('express-validator')

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        let errorMsg = ''
        errors.array().forEach(e=>{
         errorMsg += e.msg + ' - '
        })
        return res.status(422).json({
            error: errorMsg
        })
    }
    next()
}
