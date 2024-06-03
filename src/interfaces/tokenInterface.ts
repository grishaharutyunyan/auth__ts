import { Schema, Document } from "mongoose";

export default interface IToken extends Document {
    user: Schema.Types.ObjectId;
    refresh: string;
}