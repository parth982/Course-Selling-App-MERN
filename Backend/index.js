const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

const initiate = () => {
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(process.env.PORT || 4000, () =>
        console.log("Server running on port 4000")
      );
    })
    .catch((err) => console.log(err.message));
};
initiate();
