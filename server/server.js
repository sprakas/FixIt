const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const userRouter = require('./routes/userRoute')
const User = require('./modals/usersModal')
const projectRouter = require('./routes/projectsRoute')
const db = require("./db");
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',userRouter)
app.use('/projects/',projectRouter)


app.get('/ping', function (req, res) {
  res.send([{ "name": "surya", "age": 20 }, { "name": "anand", "age": 19 }])
});

app.get('/', function (req, res) {
  res.send([{ "name": "surya", "age": 20 }, { "name": "anand", "age": 19 }])
});

db.connect()
    .then(() => {
        app.listen( 8080 , () => {
          console.log("App listening in Port : 8080");
          console.log('MongoDB Connected...')
        });
    }).catch((error) => {
        console.log(error);
    });
app.use((error,req,res,next)=>{
  if(error) res.send({"message": error.message})
})