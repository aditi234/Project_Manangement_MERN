const Task = require('./../models/taskModel');
const catchAsync = require('../utils/catchAsync');

exports.searchTasks = catchAsync(async(req, res, next)=>{
    let query;

    if(req.body.percentageComplete==='yes'){
        query = Task.find({members: req.user.email}).sort({percentageComplete: 1});
    }else{
        query = Task.find({members: req.user.email});
    }
    
    req.query.deadlineBefore = req.body.deadlineBefore;
    req.query.deadlineAfter = req.body.deadlineAfter;
    req.query.projectName = req.body.projectName;

    if(req.query.projectName!=null && req.query.projectName!=''){
        query = query.regex('projectName', new RegExp(req.query.projectName, 'i'))
    }
    if(req.query.deadlineBefore!=null && req.query.deadlineBefore!=''){
        query = query.lte('finishDate', req.query.deadlineBefore)
    }
    if(req.query.deadlineAfter != null && req.query.deadlineAfter!=''){
        query = query.gte('finishDate', req.query.deadlineAfter)
    }
    
    query = await query;
    res.status(200).json({
        query
    })
})