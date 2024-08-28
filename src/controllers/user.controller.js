import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { username, email, fullName, password, role, department } = req.body;
        const user = new User({ username, email, fullName, password, role, department });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
