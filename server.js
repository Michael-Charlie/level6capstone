const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");
const mongoURL = process.env.MONGODB_URI;

app.use(express.json());

app.use(morgan("dev"));

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

app.listen(9000, () => {
  console.log("The server is running on port 9000.");
});
