const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("******1", req.isAuth);

  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    req.isAuth = false;
    console.log("******2", req.isAuth);

    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  console.log("******3", req.isAuth);
  next();
};
