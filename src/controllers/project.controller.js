import { Project } from '../models/Project.js';

export const createProject = async (req, res) => {
    try {
        const { name, description, departments, projectAdmin, workers } = req.body;
        const project = new Project({ name, description, departments, projectAdmin, workers });
        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error });
    }
};

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
        const { projectId } = req.params;
        await Project.findByIdAndDelete(projectId);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('departments').populate('projectAdmin').populate('workers');
        res.json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};
