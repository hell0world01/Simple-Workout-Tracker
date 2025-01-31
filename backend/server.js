require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);

//DB connection
mongoose.connect(process.env.DB_CONNECTION)
    .then( () => console.log("Database connected"))
    .catch( err => console.log(err))

//Listening request
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));