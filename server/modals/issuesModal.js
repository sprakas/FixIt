const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const IssuesSchema = new mongoose.Schema({
  description : {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500
  },
  screenName : {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  projectId : {
      type : Schema.Types.ObjectId,
      ref: 'users'
  },
  openedBy : Schema.Types.ObjectId,
  projectId : Schema.Types.ObjectId,
  closedBy : [ Schema.Types.ObjectId ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status : {
    type: String,
    required: true
  },
  priority : {
    type : String,
    required : true
  }

});


const Issue =  mongoose.model('issues', IssuesSchema);

function validateIssue(issue) {
  const schema = {
    description: Joi.string().min(3).max(500).required(),
    screenName : Joi.string().min(3).max(255).required()
  };

  return Joi.validate(issue, schema);
}
module.exports = { Issue, validateIssue }

