import { Types } from "mongoose";

export interface IUser {
    name: string,
    email: string;
    password: string;
}

export interface IPayload {
    id: Types.ObjectId;
    name: string;
    email: string;
    picture: string;
}

export interface IUserUpdate {
    userId: number,
    name: string,
    email: string;
    password: string;
}
