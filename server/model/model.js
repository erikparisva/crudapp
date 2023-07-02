const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    priority: String,
    label: String
});

const taskdb = mongoose.model('taskdb', schema);

module.exports = taskdb;