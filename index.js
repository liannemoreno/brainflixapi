const express = require("express");
const app = express();
const PORT = 8083;
const videosRoutes = require("./routes/videos");
const cors = require('cors');


app.use(cors())
app.use(express.json());


app.use((req, res, next) => {
    console.log(`it's working!`);
    next();
})


app.use("/videos", videosRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});