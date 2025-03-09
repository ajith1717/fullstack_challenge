const { check, validationResult } = require("express-validator");

// Function for validating guardian signup request
exports.validateGuardianSignup = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage({ msg: "Email address must not be empty", field: "email" })
        .isEmail()
        .withMessage({ msg: "Invalid email address", field: "email" }),
    check("name")
        .trim()
        .notEmpty()
        .withMessage({ msg: "Name must not be empty", field: "name" }),

];

// Function for validating email login
exports.validateEmailLogin = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage({ msg: "Email address must not be empty", field: "email" })
        .isEmail()
        .withMessage({ msg: "Invalid email address", field: "email" }),
    check("password")
        .trim()
        .notEmpty()
        .withMessage({ msg: "Password must not be empty", field: "password" }),
];

// Function for validating organization
exports.validateOrganization = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage({ msg: "Name must not be empty", field: "name" }),
];

// Middleware to handle validation errors
exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
