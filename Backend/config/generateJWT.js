const jwt = require("jsonwebtoken");

const generateJWT = (username, role) => {
  const jwtSecret =
    role === "admin"
      ? process.env.JWT_SECRET_ADMIN
      : process.env.JWT_SECRET_USER;
  return jwt.sign({ username, role }, jwtSecret, {
    expiresIn: "2d",
  });
};

module.exports = generateJWT;
