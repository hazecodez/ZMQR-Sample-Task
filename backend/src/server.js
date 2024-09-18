const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const { signUp, login } = require("./Controllers/controller");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
//to enable cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//connect to mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.post("/login", (req, res) => login);

app.post("/signup", (req, res) => signUp);

app.listen(4000, () => console.log("Server is running on port 4000"));
