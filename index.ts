import express, { Application } from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import { FRONT_END, PORT, SESSION_SECRET } from "./src/config/config";

import mongoDB from "./src/db/mongodb";

import handlingMiddleware from "./src/middlewares/handlingMiddleware";

import authRouter from "./src/routers/authRouter";
import userRouter from "./src/routers/userRouter";
// import path from 'path';

const startServer = async () => {
    const app: Application = express();

    await mongoDB();

    app.use(cors({
        // origin: FRONT_END,
        // credentials: true
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);

    app.use(handlingMiddleware);


    app.listen(PORT, () => console.log(`Server started on port ${PORT}👨🏻‍💻‍`));
};

startServer().then(() => {
    console.log('Server started successfully');
}).catch((error) => {
    console.error('Error starting server:', error);
});
