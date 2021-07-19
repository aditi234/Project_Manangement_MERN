const mongoose = require('mongoose');
const {ObjectId} =mongoose.Schema.Types

const taskSchema = mongoose.Schema({
    projectId:{
        type: String,
        required: true
    },
    projectName:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    finishDate: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        required: true
    },
    percentageComplete: {
        type: Number,
        required:true,
        default: 0
    },
    author: {
        type: ObjectId,
        ref: "User"
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    members: [
        {
            type: String
        }
    ]

});

const task = mongoose.model('Tasks', taskSchema);
module.exports = task;


