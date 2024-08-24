import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from '../models/User.js';
import Project from '../models/Project.js';

// Create a new user (worker, project admin, or main admin)
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, departmentId } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            role,
            department: role !== 'Main Admin' ? departmentId : null,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all users (with optional role filtering)
export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};

        const users = await User.find(query).populate('department assignedProjects');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('department assignedProjects');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a user (e.g., change role, department)
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Assign a project to a user (for project admins or workers)
export const assignProjectToUser = async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        user.assignedProjects.push(projectId);
        await user.save();

        res.status(200).json({ message: 'Project assigned to user successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
