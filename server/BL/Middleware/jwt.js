

const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

//npm install jsonwebtoken
dotenv.config();


//some key to open the token. should be in ".env" file
const secret = process.env.CONNECTION_STRING
// const secret = "34534h5jhj65";


exports.createToken = (id) => {
  const token = jwt.sign({ id }, secret, { expiresIn: "100m" });

  return token;
};

exports.verifyToken = (id, token) => {
  try {
    const tokenData = jwt.verify(token, secret/*, {ignoreExpiration: true}*/ ) || {};
    console.log(id)
    console.log(tokenData.id+"in jwt");
    console.log(id);
    console.log(tokenData.id);
    console.log( Date.now());
    console.log(tokenData.exp * 1000);
    if (id.toString() !== tokenData.id || Date.now() > tokenData.exp * 1000)
    {
      console.log("error");
      throw { error: "token unouthorized" };
  
    }
    return true;

  } catch(err) {
    // err
  }
   
  
};
