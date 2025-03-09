const bcrypt = require("bcryptjs");


// function for match login password with db pass using bcrypt
const bcryptPasswordMatch = async (plaintextPassword, encodedPassword) => {
    return bcrypt.compare(plaintextPassword, encodedPassword)
        .then(match => {
            // console.log(`match`, match);
            if (match) {
                return match;
            } else {
                return false
            }
        }).catch(err => {
            console.log(`error occurred during matching password`, err);
            return false;
        })
}
// Function for generate bcrypt password
const generateBcryptPassword = async (plainTextPassword) => {
    try {

        let saltRounds = parseInt(process.env.ENCRYPTION_SALT_ROUNDS);
        let hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        return hashedPassword;

    } catch (err) {
        console.log('error occurred during hashing password', err)
    }
}

module.exports = {
    generateBcryptPassword,
    bcryptPasswordMatch,
};

