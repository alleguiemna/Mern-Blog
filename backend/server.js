const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const multer = require("multer");
const path= require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))
connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/users/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

//routes
app.use("/users/auth", authRoute);
app.use("/users/users", userRoute);
app.use("/users/posts", postRoute);
app.use("/users/categories", categoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on port ${PORT}`)
);
