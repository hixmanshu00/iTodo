const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    category: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    isPriority: {
        type: Boolean,
        default: false
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
