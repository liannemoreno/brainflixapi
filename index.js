const express = require("express");
const app = express();
const videosRoutes = require("./routes/videos");
const cors = require('cors');
require('dotenv').config()
const { PORT } = process.env

app.use(cors())
app.use(express.json());

app.use("/videos",express.static("./public/images"));
app.use("/videos", videosRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});