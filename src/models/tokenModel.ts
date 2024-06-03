import mongoose, { Schema } from "mongoose";
import TokenInterface from "../interfaces/tokenInterface";

const tokenSchema = new Schema<TokenInterface>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    refresh: { type: String, required: true },
});

export default mongoose.model("tokens", tokenSchema);
