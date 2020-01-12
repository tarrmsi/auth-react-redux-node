import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import { logs } from "./vars";
import passport from "./passport";
import authRoutes from "../api/services/user/routes";

const app = express();

// Middleware
app.use(morgan(logs));
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
