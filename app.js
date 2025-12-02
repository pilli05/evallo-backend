const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const authRoute = require("./src/routes/auth.routes");
const userRoute = require("./src/routes/user.routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://evallo-seven.vercel.app"],
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
