import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

import initDB from "./config/initDB.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(errorHandler);

await initDB();

export default app;
