import mongoose, {Schema} from "mongoose";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
});

module.exports = mongoose.model('Department', departmentSchema);