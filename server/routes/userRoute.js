const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const jwt = require('jsonwebtoken');
const Jwt_token = "secret"
const auth = require('../utils/authenticate')
const UserModal = require('../modals/usersModal')
router.get('/', function(req,res){
    res.send(userController.user)
})
router.get("/login",async(req,res)=>{
    let payload={
        email:"eswar@email.com",
        password: "password"
    }

    let token = await jwt.sign(payload,Jwt_token,{
        expiresIn : "6000"
    })
})
router.post("/register", async (req, res) => {
    const { error } = UserModal.validateUser(req.body);
    console.log(error)
    if (error) return res.status(400).json({message: error.details[0].message});
  
    //find an existing user
    let user = await UserModal.User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
  
    user = new UserModal.User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      isAdmin : req.body.isAdmin
    });
    // user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  });
  
module.exports = router