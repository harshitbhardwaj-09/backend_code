import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/projects', authenticate, createProject);
router.get('/projects', authenticate, getAllProjects);
router.get('/projects/:id', authenticate, getProjectById);
router.put('/projects/:id', authenticate, updateProject);
router.delete('/projects/:id', authenticate, deleteProject);

export default router;
