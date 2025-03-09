const jwt = require("jsonwebtoken");




// function for sign jwt token
exports.signJWTToken = async (payload) => {
    let secret = process.env.COMMON_SECRET_KEY
    let token = jwt.sign(payload, secret, { expiresIn: "31536000s" });
    return token
}
