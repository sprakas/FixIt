const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', function(req,res){
    res.send(userController())
})


module.exports = router;