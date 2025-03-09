const mongoose = require("mongoose");
const { mongoDbConn } = require("../mongo");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
    token: { type: String },
    isVerified: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoDbConn.model("user", userSchema);
