// const env = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const useRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin/auth");
const cors = require("cors");
const path = require("path");
// import router from './routes/user';

//initializing environment variables
// env.config();

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//MongoDB connection
//mongodb+srv://root:<password>@cluster0.anmlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://daniel:${process.env.DATABASE_PASSWORD}@cluster0.g3g09x7.mongodb.net/bank?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DataBase Connected");
  });
app.use(cors());
app.use(express.json());
app.use("/api", useRoutes);
app.use("/api", adminRoutes);

// Serve the frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(
//     path.resolve(__dirname, "../", "frontend", "build", "index.html")
//   )
// );
app.listen(process.env.PORT || 2000, () => {
  console.log(`Server is running `);
});
