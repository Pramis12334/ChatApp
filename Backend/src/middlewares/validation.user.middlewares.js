const { body, validationResult } = require("express-validator");

async function validateResult(req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    next();
}

const registerUserValidationResult = [
    body("username")
    .isString()
    .withMessage("Username must be a string.")
    .isLength({ min: 1 , max: 20})
    .withMessage("Username must be between 1 and 20 characters."),

    body("email")
    .isEmail()
    .withMessage("Email must be valid."),

    body("password")
    .isLength({ min: 6, max: 20})
    .withMessage("Password must be between 6 and 20 characters."),
    validateResult];

const loginUserValidationResult = [
    body("email")
    .isEmail()
    .withMessage("Email must be valid."),

    body("password")
    .isLength({ min: 6, max: 20})
    .withMessage("Password must be between 6 and 20 characters."),
    
    validateResult];

const updateProfileValidationResult = [
    body("profilepic")
    .isURL()
    .withMessage("Profilepic must be valid"),
    validateResult]

const forgotPasswordValidationResult = [
    body("email")
    .isEmail()
    .withMessage("Email must be valid."),
    validationResult]

const resetPasswordValidationResult = [
    body("password")
    .isLength({ min: 6, max: 20})
    .withMessage("Password must be between 6 and 20 characters"),
    validateResult]


module.exports = {
    registerUserValidationResult,
    loginUserValidationResult,
    updateProfileValidationResult,
    forgotPasswordValidationResult,
    resetPasswordValidationResult,
}