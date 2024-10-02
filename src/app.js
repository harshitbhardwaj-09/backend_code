import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";
import rateLimit from "express-rate-limit";

const app = express()
const upload = multer(); // Initialize multer without any storage configuration for handling form-data

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import authRouter from './routes/auth.js'
import apiRouter from './routes/api.js'
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
    message: {
        error: "Too many requests, please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all requests
app.use(limiter);
app.use("/admin",authRouter);
app.use("/api",apiRouter);

export { app }