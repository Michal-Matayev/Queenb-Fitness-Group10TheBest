const bcryptjs = require("bcryptjs");
// npm i bcryptjs
const UserController = require("../../DL/Controllers/userController");

async function read(filter) {
  return await UserController.read(filter);
}

async function readOne(filter, projection) {
  return UserController.readOne(filter, projection);
}

async function create(data) {
  console.log("in create");
  if (!data.email?.includes("@")) throw "you forgot to put @";

  return UserController.create(data);
}

async function register(data) {
  console.log("in register");

  const { firstName, lastName, password } = data;
  console.log(firstName);
  console.log(lastName);

  if (!data.firstName) throw `'firstName' is required`;
  if (!data.lastName) throw `'lastName' is required`;

  data.name = `${firstName} ${lastName}`;
  data.password = bcryptjs.hashSync(password, 10); // add salt rounds for security

  return await create(data);
}

async function login(data) {
  console.log("in login");
  const { email, password } = data;

  // Fetch user with the specified email and include password for verification
  let user = (await UserController.read({ email }, '+password'))[0]; // projection to include password
  console.log(user);

  if (!user) throw 'Failed to login';
  
  // Compare provided password with stored hashed password
  if (!bcryptjs.compareSync(password, user.password)) {
    throw 'Email or password invalid';
  }

  user.lastSeen = Date.now();
  // Update last seen time
  await update(user._id, user);
  
  // Return user information without token
  const { password: _, ...userWithoutPassword } = user; // Exclude password from the result
  return userWithoutPassword;
}

async function update(id, data) {
  data.lastSeen = Date.now();
  return UserController.update(id, data);
}

async function readAllUsersData() {
  console.log("Fetching all users data");
  return await UserController.read({}, { name: 1, email: 1, permission: 1 });
}

module.exports = {
  ...UserController,
  create,
  update,
  register,
  login,
  read,
  readAllUsersData
  //readOne
};
