const mongoose = require("mongoose");

const { mongo, env } = require("./vars");
const { DEV } = require("./constants");

mongoose.connection.on("error", err => {
  console.error(`MongoDB Connection Error: ${err}`);
  process.exit(-1);
});

mongoose.connection.on("open", () => console.log(`MongoDB connected...`));

if (env === DEV) {
  mongoose.set("debug", true);
}

exports.connect = () => {
  mongoose.connect(mongo.uri, mongo.options);

  return mongoose.connection;
};
