const jwt = require("jsonwebtoken");
const usersModal = require('../modals/usersModal')
module.exports =async function(req, res, next) {
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = await jwt.verify(token, 'secret');
    let user = await usersModal.User.findOne({_id: decoded._id})
    if(!user) {
      return res.status(400).send("Invalid token.");
    }
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
