const app = require("./config/express");
const mongoose = require("./config/mongoose");
const { env, port } = require("./config/vars");

mongoose.connect();

app.listen(port, console.info(`Listening on port ${port} (${env} mode)...`));
