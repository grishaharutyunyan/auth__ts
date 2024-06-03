import bcrypt from "bcrypt";
import UsersModel from "../models/userModel";
import ConflictError from "../exceptions/ConflictError";
import UnauthorizedError from "../exceptions/Unauthorized";
import tokenService from "./tokenService";
import { IPayload, IUser } from "../interfaces/userInterface";

class UserServices {
    async register({ name, email, password }: IUser) {
        const candidateByEmail = await UsersModel.findOne({ email });

        if (candidateByEmail) {
            throw new ConflictError(`This email ${email} already exist`);
        }

        const bcryptPwd: string = await bcrypt.hash(password, 10);
        const user = await UsersModel.create({
            provider: "web",
            name,
            email,
            password: bcryptPwd,
            picture: "user.jpg",
        });

        const payload: IPayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
        };

        const tokens = tokenService.generateTokens({ payload });
        await tokenService.saveToken(payload.id, tokens.refreshToken);

        await user.save();
        return { ...tokens, payload };
    }

    async login({
        email,
        password,
    }: Pick<IUser, "email" | "password">) {
        const user = await UsersModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedError(`User with email ${email} not found`);
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid password");
        }

        const payload: IPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
        };

        const tokens = tokenService.generateTokens({ payload });
        await tokenService.saveToken(payload.id, tokens.refreshToken);

        await user.save();
        return { ...tokens, payload };
    }
}

export default new UserServices();
