const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyAccessToken } = require("../passport");
const { validateGuardianSignup, validateRequest } = require("../validation");
// API for Sign Up

router.post("/v1/signup", validateGuardianSignup, validateRequest, authController.signUp);


// API for Sign In
router.post("/v1/signin", authController.signIn);


// API for get user details using token 
router.get("/v1/userDetails", verifyAccessToken, authController.getUserDetails);

// API for update user details (ensure only authenticated users can update)
router.put("/v1/updateUser", authController.updateUser);


// fetch all users
router.get("/v1/users", authController.getAllUsers);


// delete user 
router.delete("/v1/user/:userId", authController.deleteUser);

module.exports = router;
