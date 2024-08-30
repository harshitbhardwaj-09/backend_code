// import { Task } from '../models/tasks.model.js';

// export const createTask = async (req, res) => {
//     try {
//         const { title, description, assignedTo, project, status, dueDate } = req.body;
//         const task = new Task({ title, description, assignedTo, project, status, dueDate });
//         await task.save();
//         res.status(201).json({ message: "Task created successfully", task });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating task", error });
//     }
// };

// export const updateTask = async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         const updates = req.body;
//         const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
//         res.json({ message: "Task updated successfully", updatedTask });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating task", error });
//     }
// };

// export const deleteTask = async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         await Task.findByIdAndDelete(taskId);
//         res.json({ message: "Task deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting task", error });
//     }
// };

// export const getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find().populate('assignedTo').populate('project');
//         res.json({ tasks });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };
