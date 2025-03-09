const users = require("../models/users");




// Function for fetching user with payload
exports.getUserByPayload = async (payload) => {
    try {
        let user = await users.findOne(payload);
        return { success: true, data: user };
    }
    catch (err) {
        console.log("Error occurred while fetching user by email:", err);
        throw err;
    }
}


// Functions used to create user 
exports.createUser = async (payload) => {
    try {
        let user = new users(payload);
        let result = await user.save();
        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, data: null };
        }
    }
    catch (err) {
        console.log("Error occurred while saving user:", err);
        throw err;
    }
}


// Function used to update user
exports.updateUser = async (query, payload) => {
    try {
        let result = await users.updateOne(query, payload);
        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, data: null };
        }
    }
    catch (err) {
        console.log("Error occurred while updating user:", err);
        throw err;
    }
}



// dellete user
exports.deleteUser = async (query) => {
    try {
        let result = await users.deleteOne(query);
        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, data: null };
        }
    }
    catch (err) {
        console.log("Error occurred while deleting user:", err);
        throw err;
    }


}

// Function used to get all users by sort create date
exports.getAllUsers = async () => {
    try {
        let result = await users.find({ role: "user" }).sort({ createdAt: -1 });
        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, data: null };
        }
    }
    catch (err) {
        console.log("Error occurred while fetching all users:", err);
        throw err;
    }
}