import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";

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

app.use("/admin",authRouter);
app.use("/api",apiRouter);

export { app }