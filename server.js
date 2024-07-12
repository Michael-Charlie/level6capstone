const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");
const mongoURL = process.env.MONGODB_URI;
const path = require("path");

app.use(express.json());

app.use(morgan("dev"));

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, "client", "dist")));

mongoose.set("strictQuery", true);

mongoose.connect(
  mongoURL,
  (err) => {
    console.log("Connected to the database.", err);
  }
);

app.use("/auth", require("./routes/authRouter.js"));
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

app.use("/api/comment", require("./routes/commentRouter.js"))
app.use("/api/pets", require("./routes/petsRouter.js"))

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

// Serve index.html for all remaining routes (SPA routing)
// This should be placed right before app.listen()
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(9000, () => {
  console.log("The server is running on port 9000.");
});
