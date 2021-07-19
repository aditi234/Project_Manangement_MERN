const mongoose = require('mongoose');
const {ObjectId} =mongoose.Schema.Types

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    leader: {
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

const project = mongoose.model('Project', projectSchema);
module.exports = project;