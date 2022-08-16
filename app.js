const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const initDatabase = require("./startup/initDatabase");
const routes = require("./routes");

const PORT = process.env.PORT || "8080";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://vadym:vadym-store-2003@cluster0.oohde.mongodb.net/store?retryWrites=true&w=majority"
    );
    console.log(chalk.green("MongoDB connected."));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
