import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    }],
    projectAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }]
});

export const Project = mongoose.model('Project', projectSchema);
