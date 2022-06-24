const { check, validationResult } = require("express-validator");
exports.validateRequest = [
  check("fullName").notEmpty().withMessage("please enter your name"),
  check("cnp")
    .notEmpty()
    .withMessage("please enter your CNP")
    .isLength({ min: 13 })
    .withMessage("CNP should be of 13 digits"),
  check("phone")
    .notEmpty()
    .withMessage("mobile number is required")
    .isLength({ min: 10 })
    .withMessage("mobile number should be of 10 digits"),
  check("email").isEmail().withMessage("please enter a valid email"),
  check("hash_password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("password should be of 4 characters"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
