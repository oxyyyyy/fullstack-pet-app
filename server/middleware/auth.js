const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No auth header");
    error.statusCode = 401;
    throw error;
  }

  const jwtToken = authHeader.split(" ")[1];
  let decodedJwtToken;

  try {
    decodedJwtToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedJwtToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userID = decodedJwtToken.id;
  next();
};
