import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    dueDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);
