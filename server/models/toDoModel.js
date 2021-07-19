const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    owner: {
        type: String,
        required: true
    }
});

const toDo = mongoose.model('ToDo', toDoSchema);

module.exports = toDo;