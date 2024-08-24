import express from 'express';
import { getProjects, createProject, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Get all projects
router.get('/', getProjects);

// Create a new project
router.post('/', createProject);

// Get a specific project by ID
router.get('/:id', getProjectById);

// Update a project by ID
router.put('/:id', updateProject);

// Delete a project by ID
router.delete('/:id', deleteProject);

export default router;
