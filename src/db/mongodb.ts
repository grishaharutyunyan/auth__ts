import mongoose from "mongoose";
import { MONGODB_PASSWORD } from "../config/config"

const mongoDB = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/timewise`);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(`Database connection error: ${err}`);
        process.exit(1);
    }
};

export default mongoDB;
