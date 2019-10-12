const ProjectsModal = require('../modals/projectsModal')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Bcrypt = require('bcryptjs');

const createProject = async (req) => {
    try {
        const { error } = ProjectsModal.validateProject(req.body);
        if (error) {
            return { message: 'Enter All Fields' };
        }
        
        project = new ProjectsModal.Project({
            projectName : req.body.projectName,
            description : req.body.description,
            admin : req.body.admin,
            moderators : [],
            members : [],
            tags : [],
            status : 'pending'
        });
        await project.save();
        return { 'success' : 'Project Created Succesfully'}
    }
    catch (err) {
        return { message: err }
    }
}

const getProjects = async (req) => {
    try {
        let projects = await ProjectsModal.Project.find({})
            // {}
                // $or: [{
                //     admin: req.body.userId
                // },{
                //     moderators:{$elemMatch:{$eq:Types.ObjectId(req.body.userId)}}
                // },{
                //     members:{$elemMatch:{$eq:Types.ObjectId(req.body.userId)}}
                // }]
            // }
        // );
        return { projects }
    }
    catch (err) {
        return { message: err }
    }
}
module.exports = { createProject, getProjects};