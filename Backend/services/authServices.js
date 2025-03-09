const { createUser, getUserByPayload, updateUser, getAllUsers, deleteUser } = require("../dataAccess/usersDAO");
const { generateBcryptPassword, bcryptPasswordMatch } = require("../encryption");
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require("./emailServices");




// function used to sign up 
exports.signUpService = async (payload) => {
    // check user exist in our db
    // if exist return 
    // else save the user details and return it 
    try {
        let userDetails = await getUserByPayload({ email: payload.email });
        if (userDetails.success && userDetails.data) {
            return { success: false, msg: "User already exist with this email" };
        } else if (userDetails.success && !userDetails.data) {
            if (payload.password == "" || payload.password == null) {
                // password = cap of first name first 4  + @ + 123
                payload.password = payload.name.substring(0, 4).toUpperCase() + "@" + 123
            }
            // hash the password
            if (payload.password != "" && payload.password != null) {
                // encrypt the password with bcrypt 
                let encPassword = await generateBcryptPassword(payload.password);
                payload.password = encPassword
            }
            // create one userId for user
            payload.userId = Math.random().toString(36).substring(2, 8).toUpperCase()


            payload.role = "user"
            let result = await createUser(payload);
            if (result.success) {
                // send the email to user for reset password
                // let encryptedEmail = encrypt(payload.email)
                // SES
                // const recipientEmail = payload.email
                // const link = `${process.env.CLIENT}/#/verifyEmail?email=${payload.email}&userId=${payload.userId}`;

                // // Example Usage
                // let sendEmail = await sendWelcomeEmail({
                //     email: payload.email,
                //     name: payload.name,
                //     verificationLink: link,
                //     password: payload.password
                // });


                // let sendEmail = await sendWelcomeEmail(recipientEmail, link, payload.firstName + " " + payload.lastName);
                // if (sendEmail) {
                //     const options = {
                //         header: {
                //             kid: payload.userId // Set your Key ID here
                //         },
                //         algorithm: 'HS256',
                //         expiresIn: "1d"
                //     };
                const accessToken = jwt.sign({
                    userId: payload.userId,
                    key: payload.userId,
                    // iss: 'https://er.adktest.solutiontechservices.com', // issuer
                    aud: payload.userId,
                    scope: 'optional', // Include any additional claims you need
                }, process.env.JWT_SECRET, options);
                updateUser({ email: payload.email }, { token: accessToken });
                payload.token = accessToken;
                return { success: true, msg: "User created successfully", data: payload };
                // } else {
                //     let responseObj = {
                //         success: false,
                //         msg: "Failed to sent email for sign up",
                //         errors: [{
                //             type: "",
                //             message: "Failed to sent email for sign up",
                //             code: ""
                //         }]
                //     }
                //     return responseObj
                // }

            } else {
                return { success: false, msg: "Error occurred while creating user" };
            }
        } else {
            return { success: false, msg: "Error occurred while checking user exist or not" };
        }
    }
    catch (err) {
        console.log("Error occurred while sign up:", err);
        throw err;
    }

}



// function used to sign in
exports.signInService = async (payload) => {
    try {
        let userDetails = await getUserByPayload({ email: payload.email });
        if (userDetails.success && userDetails.data) {
            // match the password
            let match = await bcryptPasswordMatch(payload.password, userDetails.data.password);
            if (match) {
                const options = {
                    header: {
                        kid: userDetails.data.userId // Set your Key ID here
                    },
                    algorithm: 'HS256',
                    expiresIn: "1d"
                };
                const accessToken = jwt.sign({
                    userId: userDetails.data.userId,
                    key: userDetails.data.userId,
                    aud: userDetails.data.userId,
                    scope: 'optional', // Include any additional claims you need
                }, process.env.JWT_SECRET, options);
                updateUser({ email: payload.email }, { token: accessToken });
                userDetails.data.token = accessToken;
                return { success: true, msg: "User sign in successfully", data: userDetails.data };
            } else {
                return { success: false, msg: "Invalid password" };
            }
        } else if (userDetails.success && !userDetails.data) {
            return { success: false, msg: "User not exist with this email" };
        } else {
            return { success: false, msg: "Error occurred while checking user exist or not" };
        }
    }
    catch (err) {
        console.log("Error occurred while sign in:", err);
        throw err;
    }
}






// function used to get user profile by token
exports.getUserDetails = async (payload) => {
    try {
        let userDetails = await getUserByPayload({ userId: payload.userId });
        if (userDetails.success && userDetails.data) {

            return { success: true, data: userDetails.data };
        } else if (userDetails.success && !userDetails.data) {
            return { success: false, msg: "User not exist with this email" };
        } else {
            return { success: false, msg: "Error occurred while checking user exist or not" };
        }
    }
    catch (err) {
        console.log("Error occurred while get user details:", err);
        throw err;
    }
}





// function used to update user details
exports.updateUserDetails = async (payload) => {
    try {

        // hash the password
        if (payload.password != "" && payload.password != null) {
            // encrypt the password with bcrypt 
            let encPassword = await generateBcryptPassword(payload.password);
            payload.password = encPassword
        }
        // let userDetails = await getUserByPayload({ email: payload.email });
        // if (userDetails.success && userDetails.data) {
        let result = await updateUser({ userId: payload.userId }, payload);
        if (result.success) {
            // fetch user details after update
            let userDetails = await getUserByPayload({ userId: payload.userId });
            if (userDetails.success && userDetails.data) {
                return { success: true, msg: "User updated successfully", data: userDetails.data };
            } else {
                return { success: false, msg: "Error occurred while fetching user details after update" };
            }
        } else {
            return { success: false, msg: "Error occurred while updating user" };
        }
        // } else if (userDetails.success && !userDetails.data) {
        //     return { success: false, msg: "User not exist with this email" };
        // } else {
        //     return { success: false, msg: "Error occurred while checking user exist or not" };
        // }
    }
    catch (err) {
        console.log("Error occurred while update user:", err);
        throw err;
    }
}


// function used to get all users
exports.getAllUsersService = async () => {
    try {
        let userDetails = await getAllUsers({});
        if (userDetails.success && userDetails.data) {
            return { success: true, data: userDetails.data };
        } else if (userDetails.success && !userDetails.data) {
            return { success: false, msg: "No users found" };
        } else {
            return { success: false, msg: "Error occurred while fetching users" };
        }
    }
    catch (err) {
        console.log("Error occurred while fetching users:", err);
        throw err;
    }
}


// function used to delete user
exports.deleteUserService = async (userId) => {
    try {
        let userDetails = await getUserByPayload({ userId: userId });
        if (userDetails.success && userDetails.data) {
            let result = await deleteUser({ userId: userId });
            if (result.success) {
                return { success: true, msg: "User deleted successfully" };
            } else {
                return { success: false, msg: "Error occurred while deleting user" };
            }
        } else if (userDetails.success && !userDetails.data) {
            return { success: false, msg: "User not exist with this userId" };
        } else {
            return { success: false, msg: "Error occurred while checking user exist or not" };
        }
    }
    catch (err) {
        console.log("Error occurred while delete user:", err);
        throw err;
    }
}