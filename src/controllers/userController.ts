import { Request, Response, NextFunction } from "express";
import NotFoundError from "../exceptions/NotFoundError";
import UsersModel from "../models/userModel";
import userService from "../services/userService";

class userController {
    async getUserById(userId: number) {
        const user = await UsersModel.findById(userId);
        if (!user) {
            throw new NotFoundError("User with id not found");
        }
        return user;
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, name, email, password } = req.body;
            await userService.updateUser({ userId, name, email, password });
            return res.status(204).json({
                value: null,
                message: "User with id successfully update",
                status: "success",
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: string = req.params.userId;
            await userService.deleteUser(userId);
            return res.status(204).json({
                value: null,
                message: `User with id  successfully deleted`,
                status: "success",
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new userController();