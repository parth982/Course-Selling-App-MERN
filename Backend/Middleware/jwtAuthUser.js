const jwt = require("jsonwebtoken");

const jwtAuthUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_USER, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else res.sendStatus(401);
};

module.exports = jwtAuthUser;
