import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UnauthorizedError from "../exceptions/Unauthorized";
import tokenService from "../services/tokenService";

class AuthValidator {
    validateAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) { next(new UnauthorizedError("Unauthorized - Invalid credentials")) }

            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;

            if (userData) {
                tokenService.findToken(userData.payload.id);
                req.body.user = userData.payload;

                next();
            } else {
                next(new UnauthorizedError("Unauthorized"));
            }
        } catch (err) {
            next(new UnauthorizedError("Unauthorized - Invalid credentials"));
        }
    }
}

export default new AuthValidator();