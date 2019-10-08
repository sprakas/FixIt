const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id}, 'secret');
  return token;
}

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 11);
  next();
});

const User = mongoose.model('users', UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(user, schema);
}
module.exports = { User, validateUser }

