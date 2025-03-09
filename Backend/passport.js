const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const Users = require("./models/users");
const { HTTP_STATUS_CODE } = require("./constant/general");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "challenge"


passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Users.findOne({ userId: jwt_payload.userId }, 'userId').lean()
            .then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false, { message: 'No user found', status: 404 });
            }).catch(err => {
                console.log('err', err)
                return done(null, false);
            })
        // .catch((err) => { logger.error({ passport: err }));
    })
);



const jwt = require('jsonwebtoken');

exports.verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET,); // Verify token
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
}

