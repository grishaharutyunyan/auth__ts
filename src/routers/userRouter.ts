import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get(
    "/:userId",
    authMiddleware.validateAccessToken,
    userController.getUserById
);

router.patch(
    "/:userId",
    authMiddleware.validateAccessToken,
    userController.updateUser
);

router.delete(
    "/:userId",
    authMiddleware.validateAccessToken,
    userController.deleteUser
);

export default router;
