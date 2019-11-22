const express = require('express')
const router = express.Router()
const auth = require('../utils/authenticate')
const Projects = require('../controllers/projectsController')

router.post('/createProject',auth,async (req,res)=> {
    try {
        let data = await Projects.createProject(req)
        // console.log('data',data)
        res.send(data)
      }
      catch (err) {
        throw new Error('Error')
      }
})
router.get("/projects", auth, async (req, res) => {
  try {
    let data = await Projects.getProjects(req)
    // console.log('data',data)
    res.send(data)
  }
  catch (err) {
    throw new Error('Error')
  }
})
router.post("/login", async (req, res) => {
  try {
    let data = await userController.login(req)
    // console.log('data',data)
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