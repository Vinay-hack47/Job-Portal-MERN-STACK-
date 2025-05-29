import express from "express";
import { login, logout, register, update, updateProfile } from "../controllers/user.controller.js";
import { singleUpload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/update/:id").put(update)
router.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile)

export default router;