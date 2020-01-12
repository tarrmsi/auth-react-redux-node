import app from "./config/express";
import mongoose from "./config/mongoose";
import { env, port } from "./config/vars";

mongoose.connect();

app.listen(port, console.info(`Listening on port ${port} (${env} mode)...`));
