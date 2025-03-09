const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyAccessToken } = require("../passport");
const { validateGuardianSignup, validateRequest } = require("../validation");
const rateLimit = require("express-rate-limit");

// Rate limiting for authentication routes (Sign Up & Sign In)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests, please try again later.",
});

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /v1/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/v1/signup", authLimiter, validateGuardianSignup, validateRequest, authController.signUp);

/**
 * @swagger
 * /v1/signin:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post("/v1/signin", authLimiter, authController.signIn);

/**
 * @swagger
 * /v1/userDetails:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/v1/userDetails", verifyAccessToken, authController.getUserDetails);

/**
 * @swagger
 * /v1/updateUser:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/v1/updateUser", verifyAccessToken, authController.updateUser);

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Fetch all users (Admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get("/v1/users", verifyAccessToken, authController.getAllUsers);

/**
 * @swagger
 * /v1/user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete("/v1/user/:userId", verifyAccessToken, authController.deleteUser);

module.exports = router;
