const express = require('express')
const router = express.Router()
const auth = require('../utils/authenticate')
const userController = require('../controllers/userController')

router.get('/dashboard',auth,(req,res)=> {
  res.send("success")
})
router.post("/login", async (req, res) => {
  try {
    let data = await userController.login(req)
    console.log('data',data)
    res.send(data);
  }
  catch (err) {
    throw new Error('Error')
  }
})
router.post("/register", async (req, res) => {
  try {
    let data = await userController.register(req)
    res.send(data);
  }
  catch (err) {
    throw new Error('Error')
  }

});

module.exports = router