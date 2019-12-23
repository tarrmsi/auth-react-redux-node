const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const { logs } = require("./vars");
const passport = require("./passport");
const authRoutes = require("../api/services/user/routes");

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
