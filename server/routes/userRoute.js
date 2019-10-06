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
router.get('/dashboard', auth , async(req,res)=> {
  res.send('hello world')
})
router.post("/login",async(req,res)=>{
    let { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({message: 'please enter all the fields'})
    }
    let user = await UserModal.User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: 'User Does not exists!'})
    }
    const token = jwt.sign({ _id : user._doc._id},'secret');
    res.header("x-auth-token", token).send({
      _id: user._doc._id,
      name: user._doc.name,
      email: user._doc.email,
      token : token
    });

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