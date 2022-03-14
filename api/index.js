const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path");

// config
dotenv.config();

mongoose 
 .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

// middleware
app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./routes/users");
const playlistRoutes = require("./routes/playlists");
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);

//  deployment
__dirname = path.resolve()
if(process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}
// END

app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is running")
})
