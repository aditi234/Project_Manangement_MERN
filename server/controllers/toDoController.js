const catchAsync = require('../utils/catchAsync');
const toDo = require('./../models/toDoModel');
const AppError = require('../utils/appError');

exports.getAllTasks = catchAsync(async(req, res, next)=>{
    const tasks = await toDo.find({owner: req.user.email});

    res.status(200).json({
        tasks
      });
});

exports.createTask = catchAsync(async(req, res, next)=>{
    const task = new toDo({
        task: req.body.task,
        owner: req.user.email
    });

    const newTasks = await task.save();
    res.status(200).json({
        newTasks
      });
});

exports.deleteTask = catchAsync(async(req, res, next)=>{
    let task;
    task = await toDo.findByIdAndDelete(req.params.id);
    console.log(task);
    if(!task){
        return next(new AppError('No documents found with that ID', 404));
    }
    res.json({
        task
    });
});

exports.updateStatus = catchAsync(async(req, res, next)=>{
    let task= await toDo.findById(req.params.id);
    if(!task){
        return next(new AppError('No documents found with that ID', 404));
    }
    task.status = !task.status;
    await task.save();

    res.status(200).json({
        task
    });

})

