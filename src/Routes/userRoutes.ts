import express from "express"
import { UserController } from "../Controllers/usercontroller"
const router = express.Router()
router.post("/register",UserController.Signup)
router.post("/login",UserController.Login)
export default router