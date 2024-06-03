import jwt from "jsonwebtoken";
import TokenModel from "../models/tokenModel";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/config";
import { Types } from "mongoose";

class TokenService {
    generateTokens(payload: object) {
        const accesToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: "10d",
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });
        return {
            accesToken,
            refreshToken,
        };
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refresh = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({
            user: userId,
            refresh: refreshToken,
        });
        return token;
    }

    async findToken(userId:number) {
        const tokenData = await TokenModel.findById(userId);
        return tokenData;
    }

    async logout(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({ refresh: refreshToken });
        return tokenData;
    }
}

export default new TokenService();