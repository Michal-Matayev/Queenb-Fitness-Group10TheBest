
// const bcryptjs = require("bcryptjs");
// const { createToken, verifyToken } = require("../Middleware/jwt");
// const UserController = require("../../DL/Controllers/userController");

const bcryptjs = require("bcryptjs");
const UserModel = require("../../DL/models/UserModel");
const { createToken } = require("../Middleware/jwt");

async function create(data) {
    console.log("in create");
    return await UserModel.create(data);
}



async function update(_id, data) {
    return await UserModel.findByIdAndUpdate(_id, data, {
        new: true,
        runValidators: true,
    });
}

async function deleteUser(_id) {
    return await UserModel.findByIdAndDelete(_id);
}

async function register(data) {
    console.log(`in register logic ${data} `);
    if (!data.firstName) throw `'firstName' is required`;
    if (!data.lastName) throw `'lastName' is required`;

    data.password = bcryptjs.hashSync(data.password, 10); // Hash the password

    return await create(data);
}

async function login(data) {
    const { email, password } = data;

    // Fetch user by email
    const user = await read({ email }, '+password');

    // Check if user is found and if the password is correct
    if (!user || !bcryptjs.compareSync(password, user.password)) {
        throw 'Invalid email or password';
    }

    // Generate JWT token
    const token = createToken(user._id);

    // Return user info and token
    return { ...user._doc, token };
}

async function read(filter = {}, projection) {
    return await UserModel.findOne(filter, projection);
}

async function readAllUsersData() {
    return await read({});
}

module.exports = {
    register,
    login,
    readAllUsersData,
    update,
    deleteUser,
};
