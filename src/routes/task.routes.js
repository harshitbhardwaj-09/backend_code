import express from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Get all tasks
router.get('/', getTasks);

// Create a new task
router.post('/', createTask);

// Get a specific task by ID
router.get('/:id', getTaskById);

// Update a task by ID
router.put('/:id', updateTask);

// Delete a task by ID
router.delete('/:id', deleteTask);

export default router;
