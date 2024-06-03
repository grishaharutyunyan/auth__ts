import { Router } from "express";
import userMiddleware from "../middlewares/userMiddlewares";
import authController from "../controllers/authController";
const router = Router();

router.post(
    "/register",
    userMiddleware.validateUserRegister,
    authController.register
);

router.post(
    "/login",
    userMiddleware.validateUserLogin,
    authController.login
);

router.delete(
    "/logout",
    authController.logout
);

export default router;