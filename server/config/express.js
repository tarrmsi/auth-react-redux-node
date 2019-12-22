const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { logs } = require("./vars");
const passport = require("./passport");
const authRoutes = require("../api/services/user/routes");

const app = express();

// Middleware
app.use(morgan(logs));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
