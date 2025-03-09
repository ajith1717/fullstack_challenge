



const { HTTP_STATUS_CODE } = require("../constant/general");
const { signUpService, signInService, forgotPasswordService, resetPasswordService, checkEmailService, getUserDetails, updateUserDetails, getAllUsersService, deleteUserService } = require("../services/authServices");


// function used to sign  up 
exports.signUp = async (req, res) => {
    try {
        // call the service function to sign up
        let result = await signUpService(req.body);
        console.log("Response:", result);
        res.status(result.success ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.BAD_REQUEST).json(result);
    } catch (err) {
        console.log("Error Occurred:", err);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ success: false, msg: "Error occurred during sign up", errors: err });
    }
};


// function used to sign in
exports.signIn = async (req, res) => {
    try {
        // call the service function to sign in
        let result = await signInService(req.body);
        console.log("Response:", result);
        res.status(result.success ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.BAD_REQUEST).json(result);
    } catch (err) {
        console.log("Error Occurred:", err);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ success: false, msg: "Error occurred during sign in", errors: err });
    }
};






// function used to get user profile by token 
exports.getUserDetails = async (req, res) => {
    try {
        // call the service function to get user profile
        let result = await getUserDetails(req.user);
        console.log("Response:", result);
        res.status(result.success ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.BAD_REQUEST).json(result);
    } catch (err) {
        console.log("Error Occurred:", err);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ success: false, msg: "Error occurred during get user profile", errors: err });
    }
};




// function used to update user details
exports.updateUser = async (req, res) => {
    try {
        // call the service function to update user details
        let result = await updateUserDetails(req.body);
        console.log("Response:", result);
        res.status(result.success ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.BAD_REQUEST).json(result);
    } catch (err) {
        console.log("Error Occurred:", err);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ success: false, msg: "Error occurred during update user details", errors: err });
    }
};



// function used to get all users
exports.getAllUsers = async (req, res) => {
    try {
        // call the service function to get all users
        let result = await getAllUsersService();
        console.log("Response:", result);
        res.status(result.success ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.BAD_REQUEST).json(result);
    } catch (err) {
        console.log("Error Occurred:", err);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ success: false, msg: "Error occurred during get all users", errors: err });
    }
};


// function used to delete user
exports.deleteUser = async (req, res) => {
    try {
        // call the service function to delete user
        let result = await deleteUserService(req.params.userId);
        console.log("Response:", result);
        res.status(result.success ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.BAD_REQUEST).json(result);
    } catch (err) {
        console.log("Error Occurred:", err);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ success: false, msg: "Error occurred during delete user", errors: err });
    }
};