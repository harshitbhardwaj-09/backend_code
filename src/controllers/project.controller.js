import { Project } from '../models/project.model.js';
import {User} from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js';

export const createProject = asyncHandler(async (req, res) => {
    try {
        const { name, description, projectAdminId, workerIds } = req.body;

        const projectAdmin = await User.findById(projectAdminId);
        if (!projectAdmin) return res.status(404).json({ error: 'Project admin not found' });

        if (!Array.isArray(workerIds)) {
            return res.status(400).json({ error: 'workerIds must be an array' });
        }

        const workers = await User.find({ _id: { $in: workerIds } });

        if (workers.length !== workerIds.length) {
            return res.status(404).json({ error: 'One or more workers not found' });
        }
        
        const newProject = await Project.create({
            name,
            description,
            projectAdmin: projectAdminId,
            workers: workerIds,
        });

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const updates = req.body;
        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true });
        res.json({ message: "Project updated successfully", updatedProject });
    } catch (error) {
        res.status(500).json({ message: "Error updating project", error });
    }
};

export const deleteProject = async (req, res) => {
    try {
        console.log(req);
        const { projectId } = req.params;
        await Project.findByIdAndDelete(projectId);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('projectAdmin').populate('workers');
        res.json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};

export const getProjectById = async (req, res) => {
        console.log(req);
        const { id } = req.query;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });        
        }
        res.status(200).json({project} );
};