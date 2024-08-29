import { Router } from "express";
import { loginUser,logoutUser,refreshAccessToken,registerUser } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/register").post(
    authorizeRoles('Main Admin'),
    registerUser
)

router.route("/login").post(verifyJWT,loginUser)

router.route("/logout").post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)
export default router