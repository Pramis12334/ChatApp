const { body, validationResult } = require('express-validator');

async function validateResult(req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    next();
}

const sendMessageValidationResult = [
    body("text")
    .isString()
    .withMessage("Text must be a string")
    .isLength({ maxlength: 2000 })
    .withMessage("Text cannot be greater than 2000 characters"),

    body("image")
    .isURL()
    .withMessage("Image must be valid")
    ,validateResult]

module.exports ={
    sendMessageValidationResult
}