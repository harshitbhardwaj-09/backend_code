import Project from '../models/Project.js';
import User from '../models/User.js';

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, description, departments, projectAdminId, workerIds } = req.body;

        const projectAdmin = await User.findById(projectAdminId);
        if (!projectAdmin) return res.status(404).json({ error: 'Project admin not found' });

        const workers = await User.find({ _id: { $in: workerIds } });
        
        const newProject = new Project({
            name,
            description,
            departments,
            projectAdmin: projectAdminId,
            workers: workerIds,
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('departments projectAdmin workers tasks discussions');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('departments projectAdmin workers tasks discussions');
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a project
export const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
