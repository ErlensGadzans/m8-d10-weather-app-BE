const jwt = require("jsonwebtoken");

const authenticate = async (user) => {
  try {
    const accessToken = await generateJWT({ _id: user._id });
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//GENERATE JWT

const generateJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    )
  );

const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    })
  );
module.exports = { authenticate, verifyJWT };
