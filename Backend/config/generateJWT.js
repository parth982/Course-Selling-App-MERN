const jwt = require("jsonwebtoken");

const generateJWT = (username, role) => {
  return jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = generateJWT;
