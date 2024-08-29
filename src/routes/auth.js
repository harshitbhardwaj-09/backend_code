import { Router } from "express";
import { loginUser,logoutUser,refreshAccessToken,registerUser,changeCurrentPassword } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/register").post(
    verifyJWT,
    authorizeRoles('Main Admin'),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

export default router