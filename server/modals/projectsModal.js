const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ProjectSchema = new mongoose.Schema({
  projectName : {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description : {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  admin : Schema.Types.ObjectId,
  moderators : [ Schema.Types.ObjectId ],
  members : [ Schema.Types.ObjectId ],
  tags : [ String ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status : {
    type: String,
    required: true
  }

});


const Project =  mongoose.model('project', ProjectSchema);

function validateProject(project) {
  const schema = {
    projectName: Joi.string().min(3).max(50).required(),
    description : Joi.string().min(3).max(255).required(),
    admin : Joi.string().required()
  };

  return Joi.validate(project, schema);
}
module.exports = { Project, validateProject }

