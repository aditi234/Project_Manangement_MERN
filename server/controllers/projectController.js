const Project = require('./../models/projectModel');
const Task = require('./../models/taskModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllProjects = catchAsync(async(req, res, next)=>{
    const projects = await Project.find({members: req.user.email}).sort({ createdAt: -1});
    res.status(200).json({
        projects
      });
});

exports.getProject = catchAsync(async(req, res, next)=>{
    const project = await Project.findById(req.params.id);
    res.status(200).json({
      project
    })
})

exports.createProject = catchAsync(async(req, res, next)=>{
  const {name} = req.body;
  if(!name){
    res.json({
      error: "Please enter name of the project"
    });
  }
  const project = new Project({
    name,
    leader: req.user,
    members: req.user.email
  });
  const newProject = await project.save();
  
  res.status(200).json({
      newProject
    });
});

exports.getAllTask = catchAsync(async(req, res, next)=>{
  const tasks = await Task.find({projectId: req.params.id}).sort({ createdAt: -1});
  res.status(200).json({
    tasks
  });
})

exports.createProjectTask = catchAsync(async(req, res, next)=>{
  const project = await Project.findById(req.params.id);
  
  const task = new Task({
    projectId: project._id,
    projectName: project.name,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    description: req.body.description,
    percentageComplete: req.body.percentageComplete,
    author: req.user,
    members: project.members
  });

  const newTask = await task.save();

  res.status(200).json({
    newTask
  });
});



exports.removeTask = catchAsync(async(req, res, next)=>{
  let task;
  task = await Task.findByIdAndDelete(req.params.deleteId);

  if(!task){
    return next(new AppError('No documents found with that ID', 404));
  }
  res.json({
      task
  });
});

exports.updateTaskPercentage = catchAsync(async(req, res, next)=>{
  let task= await Task.findById(req.params.taskId);
  if(!task){
    return next(new AppError('No documents found with that ID', 404));
  }
  task.percentageComplete = req.body.percentage;
  await task.save();
    res.status(200).json({
        task
    });
})

exports.addMembers = catchAsync(async(req, res, next)=>{
  const member = await User.find({email: req.body.email});
  if(!member.length){
    res.json({
      error: 'No user with that email id'
    })
  }
  else{
    await Project.findByIdAndUpdate(req.params.id,{
      $push:{
        members: req.body.email
      }
    },{
      new: true
    }).exec((err, result)=>{
      if(err){
        return res.status(422).json({error: err})
      }else{
        res.json(result)
      }
    });
  }
  
})

exports.removeMember = catchAsync(async(req, res, next)=>{
  await Project.findByIdAndUpdate(req.params.id,{
    $pull:{ members: req.params.email}
  },{
    new: true
  }).exec((err, result)=>{
    if(err){
      return res.status(422).json({error: err})
    }else{
      res.json(result)
    }
  });
})
