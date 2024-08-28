import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, fullName, password, role, department } = req.body;
        if (
            [fullName, email, username, password, role].some((field) =>
                field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existedUser) {
            throw new ApiError(409, "user with username and email already exist");
        }
        if (password.length < 8) {
            return res.status(400).json({ msg: 'failed' })
        }
        const user = new User({ username, email, fullName, password, role, department });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error registering user", error });
        }
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    console.log("request body:", req.body);
    if (!username && !email) {
        throw new ApiError(404, "username or email is required");
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "user does not exist");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "invalid user credentials");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken,
                    refreshToken
                },
                "User logged In successfully"
            )
        )
});


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }
        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = generateAccessAndRefreshToken(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access Token refreshed"
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refrsh token")
    }
})


// export const updateUser = asyncHandler(async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const updates = req.body;
//         const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
//         res.json({ message: "User updated successfully", updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user", error });
//     }
// })

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
