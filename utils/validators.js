const {body}    = require('express-validator');
const User      = require('../models/user');

exports.registerValidators = [
    body('email', 'Enter a valid email')
        .isEmail()
        .custom(async (value, {req}) => {
        try {
            const user = await User.findOne({email: value});

            if (user) {
               return Promise.reject('This email already exists');
            }
        } catch(e) {
            console.log(e);
        }
    })
        .normalizeEmail(),
    body('password', 'Password must be 6 characters')
        .isLength({min: 5, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match')
        }
        return true;
        })
        .trim(),
    body('name', 'Name must be at least 3 characters')
    .isLength({min: 3})
    .trim()
];

exports.loginValidators = [
    body('email', 'Enter a valid email')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password must be 4 characters')
        .isLength({min: 4, max: 56})
        .isAlphanumeric()
        .trim()
];

exports.courseValidate = [
    body('title', 'Name must be at least 3 characters')
        .isLength({min: 3})
        .trim(),
    body('price', 'Enter the correct price').isNumeric(),
    body('img', 'Enter the correct url').isURL()
];